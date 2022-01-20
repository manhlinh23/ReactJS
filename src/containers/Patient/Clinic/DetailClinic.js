import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicAndDoctorOfClinic } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            console.log('check id', id);
            let res = await getDetailClinicAndDoctorOfClinic(id)
            console.log('>>> clinic', res);

            if (res && res.errCode == 0) {
                let data = res.data
                let arrDoctor = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.arrDoctorByClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctor: arrDoctor,
                })
                console.log('state clinic:', this.state);

            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        let { arrDoctor, dataDetailClinic } = this.state
        let { language } = this.props
        console.log('check statreeeee,', this.state);
        return (
            <>
                <HomeHeader />
                <div className='detail-clinic-container'>
                    <div className='detail-clinic-content'>
                        <div className='des'>
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                <>
                                    <div className='name-clinic'>{dataDetailClinic.name}</div>
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.contentMarkDown }}>
                                    </div>
                                </>
                            }
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
                                                isShowPrice={false}
                                                isShowMore={true}
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


