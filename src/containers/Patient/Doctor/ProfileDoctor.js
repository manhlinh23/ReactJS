import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';



class ProfileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profileDoctor: {},
        }
    }

    async componentDidMount() {
        let data = await this.getProfileDoctor(this.props.doctorId)
        this.setState({
            profileDoctor: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {

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


    render() {
        console.log('check state', this.state);
        console.log(this.props);
        let { profileDoctor } = this.state
        let { language } = this.props
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
                        <div className='down'>
                            {profileDoctor && profileDoctor.Markdown && profileDoctor.Markdown.description
                                && <div>
                                    {profileDoctor.Markdown.description}
                                </div>
                            }

                        </div>
                    </div>
                </div>
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


