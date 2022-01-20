import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import Select from 'react-select';
import { LANGUAGES } from '../../../../utils';
import { postBookAppointment } from '../../../../services/userService'
import moment from 'moment';
import { toast } from "react-toastify";




class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            doctorId: '',
            name: '',
            phone: '',
            email: '',
            address: '',
            reason: '',
            date: '',
            selectedGenders: '',
            timeType: '',
            genders: '',

        }
    }

    componentDidMount() {
        this.props.getGender()
    }

    buildDataGender = (data) => {
        let result = []
        let language = this.props.language

        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.EN ? item.valueEn : item.valueVi
                object.value = item.keyMap
                result.push(object)
            })

            return result
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataTimeSchedule !== prevProps.dataTimeSchedule) {
            let doctorId = this.props.dataTimeSchedule.doctorId
            let timeType = this.props.dataTimeSchedule.timeType
            this.setState({
                doctorId,
                timeType
            })
        }
    }

    handleOnchangeDate = (date) => {
        this.setState({
            date: date[0]
        })
    }

    handleOnchangeInput = (event, id) => {
        let cpState = { ...this.state }
        let valueInput = event.target.value
        cpState[id] = valueInput
        this.setState({
            ...cpState
        })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildTimeData = (dataTimeSchedule) => {
        let { language } = this.props
        if (dataTimeSchedule && !_.isEmpty(dataTimeSchedule)) {
            console.log('>>check renderbooking: ', dataTimeSchedule)
            let date = language === LANGUAGES.VI ?
                //convert timetype -> date 
                moment.unix(+dataTimeSchedule.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTimeSchedule.date / 1000).locale('en').format('ddd - DD/MM/YYYY')
            let time = language === LANGUAGES.VI ?
                dataTimeSchedule.timeTypeData.valueVi : dataTimeSchedule.timeTypeData.valueEn
            return `${time} - ${this.capitalizeFirstLetter(date)}`
        }
        return ''
    }
    buildNameData = (dataTimeSchedule) => {
        let { language } = this.props
        if (dataTimeSchedule && !_.isEmpty(dataTimeSchedule)) {
            console.log('>>check renderbooking: ', dataTimeSchedule)
            let name = language === LANGUAGES.VI ? `${dataTimeSchedule.doctorData.firstName} ${dataTimeSchedule.doctorData.lastName}` : `${dataTimeSchedule.doctorData.lastName} ${dataTimeSchedule.doctorData.firstName}`
            return name
        }
        return ''
    }



    handleBookAppoitment = async () => {
        // console.log('submit', this.state); 

        let date = new Date(this.state.date).getTime()
        let timeString = this.buildTimeData(this.props.dataTimeSchedule)
        let doctorName = this.buildNameData(this.props.dataTimeSchedule)
        let res = await postBookAppointment({
            name: doctorName,
            doctorId: this.state.doctorId,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            language: this.props.language,
            timeType: this.state.timeType,
            selectedGenders: this.state.selectedGenders.value,
            timeString: timeString
        })

        if (res && res.errCode === 0) {
            toast.success("Succeed");
            this.props.isCloseModal()
        } else {
            toast.error("Failed");
        }

    }

    handleChangeSelect = (selectedGenders) => {
        this.setState({
            selectedGenders: selectedGenders
        })
    }
    render() {
        let { isOpenModal, isCloseModal, dataTimeSchedule } = this.props
        // let doctorId = dataTimeSchedule && dataTimeSchedule.doctorId ? dataTimeSchedule.doctorId : ''
        let doctorId = dataTimeSchedule && !_.isEmpty(dataTimeSchedule) ? dataTimeSchedule.doctorId : ''
        console.log('check props modal', this.props);
        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    size='lg'
                    centered
                    className={'booking-modal-container'}
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>
                                <FormattedMessage id='modal.info' />
                            </span>
                            <span
                                onClick={isCloseModal}
                                className='right'>
                                <i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowProfile={false}
                                isShowPrice={true}
                                dataTimeSchedule={dataTimeSchedule}
                            >
                            </ProfileDoctor>
                            <div className='booking-modal-body__price'>
                            </div>
                            <div
                                className='booking-modal-body__fill-in row'>
                                <div
                                    value={this.state.name}
                                    onChange={(event) => this.handleOnchangeInput(event, 'name')}
                                    className='col-6 form-group'>
                                    <label><FormattedMessage id='modal.name' /></label>
                                    <input className='form-control' />
                                </div>
                                <div
                                    value={this.state.phone}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phone')}
                                    className='col-6 form-group'>
                                    <label><FormattedMessage id='modal.phone' /></label>
                                    <input className='form-control' />
                                </div>
                                <div
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                    className='col-6 form-group'>
                                    <label><FormattedMessage id='modal.email' /></label>
                                    <input className='form-control' />
                                </div>
                                <div
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    className='col-6 form-group'>
                                    <label><FormattedMessage id='modal.address' /></label>
                                    <input className='form-control' />
                                </div>
                                <div
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                    className='col-12 form-group'>
                                    <label><FormattedMessage id='modal.reason' /></label>
                                    <input className='form-control' />
                                </div>
                                <div
                                    className='col-6 form-group'>
                                    <label><FormattedMessage id='modal.birthday' /></label>
                                    <DatePicker
                                        className='form-control'
                                        onChange={this.handleOnchangeDate}
                                        value={this.state.date}
                                    />
                                </div>
                                <div
                                    className='col-6 form-group'>
                                    <label><FormattedMessage id='modal.gender' /></label>
                                    <Select
                                        value={this.state.selectedGenders}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button
                                // onClick={isCloseModal}
                                onClick={() => this.handleBookAppoitment()}
                                className='btn - btn-primary'><FormattedMessage id='modal.btn-save' /></button>
                            <button
                                onClick={isCloseModal}
                                className='btn - btn-secondary'><FormattedMessage id='modal.btn-cancel' /></button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders, // redux tra ve cac gia tri sau khi da lay tu api o day
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()), // gui yeu cau lay dl tu react sang redux
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);


