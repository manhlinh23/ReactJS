import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailDoctor } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';


class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {},
            currentId: -1,
        }
    }

    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentId: id
            })
            let res = await getDetailDoctor(id)
            if (res && res.errCode == 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        } else {

        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }
    render() {
        let { detailDoctor } = this.state
        console.log(detailDoctor);
        let { language } = this.props
        let labelEn = '', labelVi = ''
        if (detailDoctor && detailDoctor.positionData) {
            labelEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`
            labelVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='introduction-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.EN ? labelEn : labelVi}
                            </div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <div>
                                        {detailDoctor.Markdown.description}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                detailDoctor={this.state.currentId} //truyen props tu cha sang con
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfo
                                detailDoctor={this.state.currentId}
                            />
                        </div>
                    </div>
                    <div className='detail-infor-doctor' >
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            // convert html to text
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>
                    <div className='comment-doctor'></div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);