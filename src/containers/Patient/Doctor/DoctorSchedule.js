import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';



class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allTime: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props

        //format ngay theo VN va EN
        // console.log(moment(new Date()).format('dddd - DD/MM'));
        // console.log(moment(new Date()).locale('en').format('ddd - DD/MM'));


        //lau lich kham ngay khi render
        let allDays = await this.getArrDays(language)
        if (allDays && allDays.length > 0) {
            let res = await getScheduleDoctorByDate(this.props.detailDoctor, allDays[0].value)
            this.setState({
                allDays: allDays,
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDays = await this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }

        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            let allDays = await this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.detailDoctor, allDays[0].value)
            if (res && res.errCode == 0) {
                this.setState({
                    allTime: res.data ? res.data : []
                })
            }
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = async (languageInput) => {

        let { language } = this.props
        let arrDate = []
        //gioi han cho select 7 ngay
        for (let i = 0; i < 7; i++) {
            let object = {};

            if (language === LANGUAGES.VI) {
                //set hôm nay với today cho ngày hiện thời
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi)
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                }
            }

            //startOf('day') = lay thoi gian dau ngay (00.00.00) vi truong date trong db xai DatePicker chi lay dc ngay ko lay dc gio => bi set 00.00.00
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            arrDate.push(object)
        }
        console.log(arrDate);
        return arrDate
    }

    handleOnChangeSelect = async (event) => {
        console.log(this.props.detailDoctor);// lay id doctor tu props cha
        if (this.props.detailDoctor && this.props.detailDoctor !== -1) {
            let doctorId = this.props.detailDoctor
            let date = event.target.value // gia tri cua option
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allTime: res.data
                })
            }
        }
    }
    render() {
        let { allDays, allTime } = this.state
        let { language } = this.props
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
                    <div className='text-above'><i class="fas fa-calendar-alt"> </i><FormattedMessage id="patient.text-above" /></div>
                    <div className='select-time'>
                        {allTime && allTime.length > 0 ?
                            allTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.EN ?
                                    item.timeTypeData.valueEn : item.timeTypeData.valueVi
                                return (
                                    <button key={index}>{timeDisplay}</button>
                                )
                            })
                            :
                            <div style={{ fontStyle: 'italic' }}> <FormattedMessage id="patient.no-schedule" /></div>
                        }
                    </div>
                    <div className='text-bottom'><FormattedMessage id="patient.text-bottom-choose" />

                        <i class="far fa-hand-point-up"></i>

                        <FormattedMessage id="patient.text-bottom-others" /></div>
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