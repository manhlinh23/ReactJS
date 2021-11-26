import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService'

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('all')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
            console.log('check state users 1', this.state.arrUsers)
        }
        console.log('get all user from node.js', response)
    }


    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <div className="title text-center"> MANAGE USERS</div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {
                            arrUsers && arrUsers.map((item, index) => { //map js
                                console.log('check map', item, index)
                                return ( //xong 1 vong lap tra ve 1 bang
                                    <tr>
                                        <>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'><i className="fas fa-pen-square"></i></button>
                                                <button className='btn-delete'><i className="fas fa-trash-alt"></i></button>

                                            </td>
                                        </>
                                    </tr>
                                )
                            })
                        }
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
