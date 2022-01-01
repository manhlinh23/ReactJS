import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from "react-toastify";
import _ from 'lodash'
import moment from 'moment'
import { saveBulkScheduleDoctor } from '../../../services/userService'



class ManageSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            currentDate: '',
            allTimeDoctor: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchTimeDoctor()
    }

    builtDataInputSelect = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                let labelEn = `${item.lastName} ${item.firstName}`
                let labelVi = `${item.firstName} ${item.lastName}`

                object.label = language === LANGUAGES.EN ? labelEn : labelVi
                object.id = item.id

                result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctorsRedux !== this.props.listDoctorsRedux ||
            prevProps.language !== this.props.language) {
            let dataSelect = this.builtDataInputSelect(this.props.listDoctorsRedux)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.timeDoctor !== this.props.timeDoctor) {
            let data = this.props.timeDoctor
            if (data && data.length > 0) {
                //tao 1 mang moi chua du lieu cua timeDoctor, copy mang vao data + bien isSelected: false
                data = data.map(item => ({ ...item, isSeclected: false }))
            }
            this.setState({
                allTimeDoctor: data // gan data vua them bien isSelected vao allTimeDoctor
            })
        }
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });

        console.log(selectedOption);
    };

    handleOnchangeDate = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { allTimeDoctor } = this.state

        if (allTimeDoctor && allTimeDoctor.length > 0) {
            allTimeDoctor = allTimeDoctor.map(item => {
                if (item.id === time.id) item.isSeclected = !item.isSeclected // thay doi gia tri qua lai cua isSelected
                return item
            })

            this.setState({
                allTimeDoctor: allTimeDoctor // sau khi thay doi se gan vao bien aTD
            })
        }
    }

    handleSaveSchedule = async () => {
        let { allTimeDoctor, selectedOption, currentDate } = this.state
        let result = [] // tao 1 mang moi 

        if (!currentDate) {
            toast.error("Missing date");
            return
        }
        if (!selectedOption && _.isEmpty(selectedOption)) {
            toast.error("Missing doctor");
            return
        }

        //format date to dd/mm/yyyy
        // let formateDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        //convert date to string
        let formateDate = new Date(currentDate).getTime();

        if (allTimeDoctor && allTimeDoctor.length > 0) {
            let selectedTime = allTimeDoctor.filter(item => item.isSeclected == true) // loc cac bien isSelected coftri la true
            if (selectedTime && selectedTime.length > 0) {
                //gan cac gia vap mang result 
                //tra ve 1 mang moi khi thay doi gtri cac bien trong mang
                selectedTime.map(item => {
                    let object = {}
                    object.doctorId = selectedOption.id
                    object.date = formateDate
                    object.timeType = item.keyMap;
                    //day cac du lieu vao mang result
                    result.push(object)
                })
            } else {
                toast.error("Missing time");
                return
            }
        }
        //push dlieu xuong db 
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedOption.id,
            date: formateDate
        })

        console.log('check api: ', res);
    }

    render() {
        let { selectedOption } = this.state;
        let { allTimeDoctor } = this.state
        let { language } = this.props
        console.log('check props', allTimeDoctor);
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title title'><FormattedMessage id='manage-schedule.title' /></div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-3 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker
                                onChange={this.handleOnchangeDate}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {allTimeDoctor && allTimeDoctor.length > 0 &&
                                allTimeDoctor.map((item, index) => {
                                    return (
                                        <button
                                            onClick={() => this.handleClickBtnTime(item)}
                                            className={item.isSeclected == true ? 'btn btn-warning btn-time' : 'btn btn-time'}
                                            key={index}>
                                            {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button
                        onClick={() => this.handleSaveSchedule()}
                        className='col-3 btn btn-primary'>
                        <FormattedMessage id='manage-schedule.btn-save' />
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listDoctorsRedux: state.admin.listDoctors,
        language: state.app.language,
        timeDoctor: state.admin.timeDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // createInfoDoctorActions: (data) => dispatch(actions.createInfoDoctorActions(data)),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchTimeDoctor: () => dispatch(actions.fetchTimeDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);