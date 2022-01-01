import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userService'



class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props

        //format ngay theo VN va EN
        console.log(moment(new Date()).format('dddd - DD/MM'));
        console.log(moment(new Date()).locale('en').format('ddd - DD/MM'));
        this.setArrDates(language)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setArrDates(this.props.language)
        }
    }

    setArrDates = async (languageInput) => {

        let { language } = this.props
        let arrDate = []
        //gioi han cho select 7 ngay
        for (let i = 0; i < 7; i++) {
            let object = {};

            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            }

            //startOf('day') = lay thoi gian dau ngay (00.00.00) vi truong date trong db xai DatePicker chi lay dc ngay ko lay dc gio => bi set 00.00.00
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            arrDate.push(object)
        }
        this.setState({
            allDays: arrDate
        })
    }

    handleOnChangeSelect = async (event) => {
        console.log(this.props.detailDoctor);// lay id doctor tu props cha
        if (this.props.detailDoctor && this.props.detailDoctor !== -1) {
            let doctorId = this.props.detailDoctor
            let date = event.target.value // gia tri cua option
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log(res);
        }
    }
    render() {
        let { allDays } = this.state
        return (
            <div>
                <div className='doctor-schedule-container'>
                    <div className='select-day'>
                        <select
                            onChange={(event) => this.handleOnChangeSelect(event)}
                            className='select-form'>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value} //gia tri cua cac option
                                            key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);