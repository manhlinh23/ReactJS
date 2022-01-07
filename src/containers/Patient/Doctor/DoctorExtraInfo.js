import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailDoctor } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import DoctorExtraInfo from './DoctorExtraInfo.scss';


class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowExtraInfo: false
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    isShowExtraInfo = (status) => {
        this.setState({
            isShowExtraInfo: status
        })
    }

    render() {
        let { isShowExtraInfo } = this.state
        return (
            <>
                <div className='doctor-extra-info-container'>
                    <div className='content-above'>
                        <div className='title-extra'>ĐỊA CHỈ KHÁM</div>
                        <div className='name-extra'>Phòng khám Chuyên khoa Da Liễu</div>
                        <div className='address-extra'>207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                    </div>
                    <div className='content-bottom'>

                        {isShowExtraInfo === false &&
                            <div
                                className='title-extra'>GIÁ KHÁM: 300.000đ. <span onClick={() => this.isShowExtraInfo(true)} className='title-extra-detail'>Xem chi tiết</span></div>
                        }
                        {isShowExtraInfo === true &&
                            <div>
                                <div>
                                    <div className='note-extra'>
                                        <div className='note-extra__title'>
                                            <div>Giá khám</div>
                                            <div className='note-extra__title__right'>300.000đ</div>
                                        </div>
                                        <div className='note-extra__content'>
                                            Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD</div>
                                    </div>
                                    <div className='payment-extra'>Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
                                </div>
                                <span
                                    onClick={() => this.isShowExtraInfo(false)}
                                    className='hide'>Ẩn bảng giá</span>
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
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);