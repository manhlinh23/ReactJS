import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

        this.listenToEmitter() // khai bao state
    }

    listenToEmitter() { //                           ()=>{} khi co data tu se setState 
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => { //emitter.on ham nhan event from parent ( from child fire event to parent use props )
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromUserManage() // set bien  isOpenModalUser = false de dong 
    }

    handleOnChangeInput = (event, id) => {
        //     this.state[id] = event.target.value
        //     this.setState({
        //         ...this.state
        //     }, () => {
        //         console.log('bad state: ', this.state)
        //     })
        //     console.log(event.target.value, id)
        // }

        //good code
        let copyState = { ...this.state } // copy cac state vao ham copyState
        copyState[id] = event.target.value // bat su kien thay doi vao cac state cua ham copy   
        this.setState({ // set cac thay doi cua state vao ham copy
            ...copyState
        }, () => {
            console.log('good code: ', copyState)
        })
    }

    checkisValidateInput = () => { // ham kt nhap day du thong tin 
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {

            // console.log('check inside loop', this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('missing input parameters ' + arrInput[i])
                break
            }
        }
        return isValid
    }

    handleAddNewuser = () => {
        let isValid = this.checkisValidateInput()
        if (isValid === true) {
            //call api
            // console.log('check prop child', this.props)
            this.props.createNewUser(this.state) //this.props cua ham cha (UserManager) this.state la cac state email password ...
            //day du lieu tu modaluser(con) sang usermanager(cha)
        }
    }

    render() {
        // console.log('check child props', this.props) // kt bien cua isOpenModalUser o ben UserManage ben day -> tra ve object
        // console.log('check child open modal', this.props.isOpen) // kt gia tri isOpenModalUser ben Cha
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
                                <input type="text" value={this.state.email} onChange={(event) => this.handleOnChangeInput(event, "email")}></input>
                            </div>

                            <div className="input-container">
                                <label>Password</label>
                                <input type="text" value={this.state.password} onChange={(event) => this.handleOnChangeInput(event, "password")}></input>
                            </div>

                            <div className="input-container">
                                <label>First Name</label>
                                <input type="text" value={this.state.firstName} onChange={(event) => this.handleOnChangeInput(event, "firstName")}></input>
                            </div>

                            <div className="input-container">
                                <label>Last Name</label>
                                <input type="text" value={this.state.lastName} onChange={(event) => this.handleOnChangeInput(event, "lastName")}></input>
                            </div>

                            <div className="input-container input-widt-max">
                                <label>Address</label>
                                <input type="text" value={this.state.address} onChange={(event) => this.handleOnChangeInput(event, "address")}></input>
                            </div>
                        </div>


                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            className="px-3"
                            onClick={() => this.handleAddNewuser()}

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


