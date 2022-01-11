import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';


class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        let { isOpenModal, isCloseModal, dataTimeSchedule } = this.props
        let doctorId = dataTimeSchedule && dataTimeSchedule.doctorId ? dataTimeSchedule.doctorId : ''
        console.log('check props modal', this.props);
        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    size='lg'
                    centered
                    className={'booking-modal-container'}
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>
                                Thông tin đặt lịch khám bệnh
                            </span>
                            <span
                                onClick={isCloseModal}
                                className='right'>
                                <i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            <ProfileDoctor
                                doctorId={doctorId}
                            >
                            </ProfileDoctor>
                            <div className='booking-modal-body__price'>
                            </div>
                            <div className='booking-modal-body__fill-in row'>
                                <div className='col-6 form-group'>
                                    <label>Họ và tên</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Số điện thoại</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ email</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ liên hệ</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-12'>
                                    <label>Lý do khám</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Đặt cho ai</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Giới tính</label>
                                    <input className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button
                                onClick={isCloseModal}
                                className='btn - btn-primary'>Lưu</button>
                            <button
                                onClick={isCloseModal}
                                className='btn - btn-secondary'>Hủy bỏ</button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

}


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);


