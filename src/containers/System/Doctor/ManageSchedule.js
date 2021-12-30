import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker';


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
            this.setState({
                allTimeDoctor: this.props.timeDoctor
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

    render() {
        let { selectedOption } = this.state;
        let { allTimeDoctor } = this.state
        let { language } = this.props
        console.log('check props', this.state);
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
                                        <button className='btn btn-warning' key={index}>
                                            {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button className='col-3 btn btn-primary'><FormattedMessage id='manage-schedule.btn-save' /></button>
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