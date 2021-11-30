import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserServices, deleteUserServices } from '../../services/userService'
import ModalUser from './ModalUser';
import { compose } from 'redux';
import { reject } from 'lodash';
import { emitter } from '../../utils/emitter'

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],//khai bao mang
            isOpenModalUser: false //khai bao thuoc tinh dong mo
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact() // goi ten ham thay cho cac syntax
    }

    getAllUsersFromReact = async () => {
        //ham goi api
        let response = await getAllUsers('all') //lay het du lieu tu database
        console.log('getAllUsersFromReact')
        if (response && response.errCode === 0) { // neu co res va res bao thanh cong (errCode =0)
            this.setState({
                arrUsers: response.users // day du lieu vao mang arrUsers
            })
            // console.log('check state users 1', this.state.arrUsers) // check du lieu da dc vao mang
        }
        // console.log('get all user from node.js', response) // check du lieu response
    }

    handleAddNewUser = () => { //set state khi mo Add new user
        this.setState({
            isOpenModalUser: true
        })
    }

    handlecloseAddNewUser = () => { // set state de dong add new user
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    createNewUser = async (data) => { //data tu ModalUser gui qua
        try {
            let response = await createNewUserServices(data) // tao 1 user moi thong qua api va du lieu dc gui tu con qua
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact() // ham load lai bang 
                this.setState({
                    isOpenModalUser: false   // dong modal
                })
            }

            emitter.emit('EVENT_CLEAR_MODAL_DATA', data) // emitter.emit de ban su kien tu cha qua con
        } catch (e) {
            console.log(e)
        }
        // console.log('check data from child: ', data)
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserServices(user.id) // *(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact() // reset lai bang
            } else {
                alert(res.errMessage)
            }
        } catch (error) {
            reject(error)
        }
    }

    render() {
        console.log('check render', this.state) // check state 
        let arrUsers = this.state.arrUsers //khai bao mang
        return (
            <div className="users-container">
                <ModalUser

                    isOpen={this.state.isOpenModalUser} // khai bao bien
                    toggleFromUserManage={this.handlecloseAddNewUser} // khai bao bien
                    test='abc'
                    createNewUser={this.createNewUser}



                />
                <div className="title text-center"> MANAGE USERS</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    > <i className="fas fa-plus"></i> Add New User</button>
                </div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => { //map js == for loop
                                    console.log('check map', item, index)
                                    return ( //xong 1 vong lap tra ve 1 bang
                                        <tr key={index}>
                                            <>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className='btn-edit'><i className="fas fa-pen-square"></i></button>
                                                    <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>

                                                </td>
                                            </>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
