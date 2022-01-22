import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getPatients } from '../../../services/userService'
import * as actions from '../../../store/actions'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';




class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //lconvert sang timetype ko lay gio ->  1642784400000
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }

    async componentDidMount() {
        let { user } = this.props
        let { currentDate } = this.state
        this.getDataPatients(user, currentDate)
    }

    getDataPatients = async (user, formattedDate) => {
        let data = await getPatients({
            doctorId: user.id,
            date: formattedDate
        })
        this.setState({
            dataPatient: data.data
        })
        console.log(data);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }


    handleOnchangeDate = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props
            let { currentDate } = this.state
            let formattedDate = new Date(currentDate).getTime()
            this.getDataPatients(user, formattedDate)
        })
    }

    render() {
        let { dataPatient } = this.state
        let { language } = this.props
        return (
            <>
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
                        <table class="table table-striped">
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
                                                    <button type="button" className='btn btn-primary btn-lg'>Done</button>
                                                    <button type="button" className='btn btn-success btn-lg'>Send</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                                    :
                                    <div>No data</div>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

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


