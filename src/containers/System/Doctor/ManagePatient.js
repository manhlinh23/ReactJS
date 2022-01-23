import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getPatients, postRemedy } from '../../../services/userService'
import * as actions from '../../../store/actions'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';



class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //lconvert sang timetype ko lay gio ->  1642784400000
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenModal: false,
            dataBtnConfirm: {},
            isActive: false,

        }
    }

    async componentDidMount() {
        this.getDataPatients()
    }

    //load data len table
    getDataPatients = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        let data = await getPatients({
            doctorId: user.id,
            date: formatedDate
        })
        this.setState({
            dataPatient: data.data
        })
        console.log(data);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    //callback
    handleOnchangeDate = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatients()
        })
    }

    handleButtonConfirm = (item) => {
        console.log('check item', item);
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType
        }
        this.setState({
            isOpenModal: true,
            dataBtnConfirm: data,
        })
        console.log('checkk data: ', this.state);
    }

    isCloseModal = () => {
        this.setState({
            isOpenModal: false,
        })
    }

    sendRemedy = async (data) => {
        let { dataBtnConfirm } = this.state
        this.setState({
            isActive: true,
        })
        let res = await postRemedy({
            doctorId: dataBtnConfirm.doctorId,
            patientId: dataBtnConfirm.patientId,
            timeType: dataBtnConfirm.timeType,
            imageBase64: data.imageBase64,
            email: data.email,
            language: this.props.language
        })

        if (res && res.errCode === 0) {
            this.setState({
                isActive: false,
                isOpenModal: false
            })
            toast.success('Sent')
            //success thi se load lai table
            await this.getDataPatients()
        } else {
            this.setState({
                isActive: false,
                isOpenModal: false
            })
            toast.warn('failed')
        }

    }

    render() {
        let { dataPatient, isOpenModal, dataBtnConfirm, isActive } = this.state
        let { language } = this.props
        return (
            <>
                <LoadingOverlay
                    active={isActive}
                    spinner
                    text='Loading your content...'
                >
                    <RemedyModal
                        isOpenModal={isOpenModal}
                        isCloseModal={this.isCloseModal}
                        dataBtnConfirm={dataBtnConfirm}
                        sendRemedy={this.sendRemedy}
                    />
                    <div className='manage-patient-container'>
                        <div className='manage-patient-content'>
                            <div className='title'>patient</div>
                            <div className='col-2 form-group'>
                                <label>Choose date</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDate}
                                    className='form-control'
                                    // value={this.state.currentDate}
                                    minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                />
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Sex</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td scope="row">{index + 1}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn}</td>
                                                    <td>{language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => this.handleButtonConfirm(item)}
                                                            type="button" className='btn btn-primary btn-lg'>Confirm</button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        )
                                        :
                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan='6'>no data</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </LoadingOverlay>

            </>
        )
    }

}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);


