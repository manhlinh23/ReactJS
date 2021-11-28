import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromUserManage() // set bien  isOpenModalUser = false de dong 
    }

    render() {
        console.log('check child props', this.props) // kt bien cua isOpenModalUser o ben UserManage ben day -> tra ve object
        console.log('check child open modal', this.props.isOpen) // kt gia tri isOpenModalUser ben Cha
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen} // gan gia tri true cua isOpenModalUser cho isOpen   
                    toggle={() => this.toggle()} // gan  gia tri false cua isOpenModalUser cho toggle
                    size='lg'
                    centered
                    className={'modal-user-container'} // cho phep su dung o 1 noi nhat dinh

                >
                    <ModalHeader
                        close={<button className="close" onClick={() => this.toggle()}>×</button>}
                        toggle={() => this.toggle()}
                    >
                        CREATE NEW USER
                    </ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <label>Email</label>
                                <input type="text"></input>
                            </div>

                            <div className="input-container">
                                <label>Password</label>
                                <input type="text"></input>
                            </div>

                            <div className="input-container">
                                <label>Firts Name</label>
                                <input type="text"></input>
                            </div>

                            <div className="input-container">
                                <label>Last Name</label>
                                <input type="text"></input>
                            </div>

                            <div className="input-container input-widt-max">
                                <label>Address</label>
                                <input type="text"></input>
                            </div>
                        </div>


                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            className="px-3"
                            onClick={() => this.toggle()}
                        >
                            OK
                        </Button>
                        {' '}
                        <Button className="px-3" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


