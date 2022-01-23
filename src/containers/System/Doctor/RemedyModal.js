import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './RemedyModal.scss'
import { Modal } from 'reactstrap';
import _ from 'lodash';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import LoadingOverlay from 'react-loading-overlay';

class RemedyModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imageBase64: '',
        }
    }

    componentDidMount() {
        if (this.props.dataBtnConfirm) {
            this.setState({
                email: this.props.dataBtnConfirm.email
            })
        }
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataBtnConfirm !== prevProps.dataBtnConfirm) {
            this.setState({
                email: this.props.dataBtnConfirm.email
            })
        }

    }

    handleChangeImage = async (event) => {
        let data = event.target.files //lay file
        let file = data[0] //lay file anh dau tien
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64 //set state cho avatar la file 
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    onChangeEmail = (e) => {
        let email = e.target.value
        this.setState({
            email: email
        }
        )
    }
    render() {
        let { isOpenModal, isCloseModal, dataBtnConfirm, sendRemedy } = this.props
        console.log('check dataBtnConfirm, ', dataBtnConfirm);
        return (
            <>

                <Modal
                    isOpen={isOpenModal}
                    size='lg'
                    centered
                    className={'booking-modal-container'}
                >
                    <div className='row p-2'>
                        <div className='col-6 form-group'>
                            <label >Email</label>
                            <input
                                onChange={(e) => this.onChangeEmail(e)}
                                value={this.state.email} className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label >Prescription</label>
                            <input
                                onChange={(event) => this.handleChangeImage(event)}
                                type='file' className='form-control-file' />
                        </div>
                        <div className='col-6 form-group'>
                            <button className=' btn btn-success'
                                onClick={() => this.handleSendRemedy()}
                            >Send</button>
                        </div>
                        <div className='col-6 form-group'>
                            <button
                                className='btn btn-danger'
                                onClick={isCloseModal}
                            >Cancel</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);


