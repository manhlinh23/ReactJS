import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getExtraInfoDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import './DoctorExtraInfo.scss';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowExtraInfo: false,
            extraInfo: {},
        }
    }

    async componentDidMount() {
        if (this.props.detailDoctor) {
            let res = await getExtraInfoDoctorById(this.props.detailDoctor)
            this.setState({
                extraInfo: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            let res = await getExtraInfoDoctorById(this.props.detailDoctor)
            this.setState({
                extraInfo: res.data
            })
        }
    }

    isShowExtraInfo = (status) => {
        this.setState({
            isShowExtraInfo: status
        })
    }

    render() {
        let { isShowExtraInfo, extraInfo } = this.state
        let { language } = this.props
        console.log(this.state);
        return (
            <>
                <div className='doctor-extra-info-container'>
                    <div className='content-above'>
                        <div className='title-extra'><FormattedMessage id='patient.clinic.address' />:</div>
                        <div className='name-extra'>{extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}</div>
                        <div className='address-extra'>{extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}</div>
                    </div>
                    <div className='content-bottom'>

                        {isShowExtraInfo === false &&
                            <div
                                className='title-extra'>
                                <FormattedMessage id='patient.clinic.price' />:
                                {extraInfo && extraInfo.addressClinic && language === LANGUAGES.VI &&
                                    <NumberFormat value={extraInfo.priceTypeData.valueVi}
                                        displayType={'text'} thousandSeparator={true} suffix={' VNĐ'} />
                                }
                                {extraInfo && extraInfo.addressClinic && language === LANGUAGES.EN &&
                                    <NumberFormat value={extraInfo.priceTypeData.valueEn}
                                        displayType={'text'} thousandSeparator={true} suffix={'$'} />
                                }
                                <span onClick={() => this.isShowExtraInfo(true)} className='title-extra-detail'><FormattedMessage id='patient.clinic.show' /></span></div>
                        }
                        {isShowExtraInfo === true &&
                            <div>
                                <div>
                                    <div className='note-extra'>
                                        <div className='note-extra__title'>
                                            <div><FormattedMessage id='patient.clinic.price' />:</div>
                                            <div className='note-extra__title__right'>
                                                {extraInfo && extraInfo.addressClinic && language === LANGUAGES.VI &&
                                                    <NumberFormat value={extraInfo.priceTypeData.valueVi}
                                                        displayType={'text'} thousandSeparator={true} suffix={' VNĐ'} />
                                                }
                                                {extraInfo && extraInfo.addressClinic && language === LANGUAGES.EN &&
                                                    <NumberFormat value={extraInfo.priceTypeData.valueEn}
                                                        displayType={'text'} thousandSeparator={true} suffix={' $'} />
                                                }
                                            </div>
                                        </div>
                                        <div className='note-extra__content'>
                                            {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                        </div>
                                    </div>
                                    <div className='payment-extra'><FormattedMessage id='patient.clinic.payment' />:
                                        {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.VI && extraInfo.paymentTypeData.valueVi}
                                        {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.EN && extraInfo.paymentTypeData.valueEn}
                                    </div>
                                </div>
                                <span
                                    onClick={() => this.isShowExtraInfo(false)}
                                    className='hide'><FormattedMessage id='patient.clinic.hide' /></span>
                            </div>
                        }
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);