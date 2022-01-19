import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyAndDoctorOfSpecialty, getAllCodeServives } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';





class DetailSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailSpecialtyAndDoctorOfSpecialty({
                id: id,
                location: 'ALL'
            })

            let province = await getAllCodeServives('PROVINCE')
            if (res && res.errCode == 0 && province && province.errCode === 0) {
                let data = res.data
                let arrDoctor = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.arrDoctorBySpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctor: arrDoctor,
                    listProvince: province.data
                })

            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleOnChangeSelect = (e) => {
        console.log('check slect', e.target.value);
    }
    render() {
        let { arrDoctor, dataDetailSpecialty, listProvince } = this.state
        let { language } = this.props
        console.log('check statreeeee,', this.state);
        return (
            <>
                <HomeHeader />
                <div className='detail-specialty-container'>
                    <div className='detail-specialty-content'>
                        <div className='des'>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&

                                <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.contentMarkDown }}>
                                </div>
                            }
                        </div>
                        <div className='select'>
                            <select onChange={(e) => this.handleOnChangeSelect(e)}>
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                        )
                                    })
                                }
                            </select>

                        </div>
                        {arrDoctor && arrDoctor.length > 0 &&
                            arrDoctor.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div
                                            className='content-left'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowProfile={true}
                                            // dataTimeSchedule={dataTimeSchedule}
                                            />

                                        </div>
                                        <div className='content-right'>

                                            <DoctorSchedule
                                                detailDoctor={item}
                                            />
                                            <DoctorExtraInfo
                                                detailDoctor={item}
                                            />
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);


