import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { Link } from 'react-router-dom'




class ProfileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profileDoctor: {},
        }
    }

    async componentDidMount() {
        if (this.props.doctorId) {
            let data = await this.getProfileDoctor(this.props.doctorId)
            this.setState({
                profileDoctor: data
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getProfileDoctor(this.props.doctorId)
            this.setState({
                profileDoctor: data
            })
        }
    }

    getProfileDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        console.log('check ', result);
        return result
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // console.log(moment(new Date()).format('dddd - DD/MM'));
    // console.log(moment(new Date()).locale('en').format('ddd - DD/MM'));
    renderTimeBooking = (dataTimeSchedule) => {
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
            return (
                <>
                    <div>{time} - {this.capitalizeFirstLetter(date)}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
        return <></>
    }
    render() {
        console.log('check state', this.state);
        console.log(this.props);
        let { profileDoctor } = this.state
        let { language, isShowProfile, dataTimeSchedule, isShowPrice, isShowMore, doctorId } = this.props
        let labelEn = '', labelVi = ''
        if (profileDoctor && profileDoctor.positionData) {
            labelEn = `${profileDoctor.positionData.valueEn} ${profileDoctor.firstName} ${profileDoctor.lastName}`
            labelVi = `${profileDoctor.positionData.valueVi} ${profileDoctor.lastName} ${profileDoctor.firstName}`
        }
        return (
            <>
                <div className='introduction-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${profileDoctor && profileDoctor.image ? profileDoctor.image : ''})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.EN ? labelEn : labelVi}
                        </div>
                        {isShowProfile === true ?
                            <div className='down'>
                                {profileDoctor && profileDoctor.Markdown && profileDoctor.Markdown.description
                                    && <div>
                                        {profileDoctor.Markdown.description}
                                    </div>
                                }
                            </div>
                            :
                            <>
                                {this.renderTimeBooking(dataTimeSchedule)}
                            </>
                        }
                    </div>
                </div>
                {isShowMore === true &&
                    //react-router-link
                    <div>
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                }
                {isShowPrice === true &&
                    <div>Giá khám:
                        {profileDoctor && profileDoctor.Doctor_info && language === LANGUAGES.VI &&
                            <NumberFormat value={profileDoctor.Doctor_info.priceTypeData.valueVi}
                                displayType={'text'} thousandSeparator={true} suffix={' VNĐ'} />
                        }
                        {profileDoctor && profileDoctor.Doctor_info && language === LANGUAGES.EN &&
                            <NumberFormat value={profileDoctor.Doctor_info.priceTypeData.valueEn}
                                displayType={'text'} thousandSeparator={true} suffix={'$'} />
                        }
                    </div>
                }

            </>
        )
    }

}


const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);


