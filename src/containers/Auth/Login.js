import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', // gan state.username cho input email
            password: '', // gan state.password cho input pw
            isShowPassword: false, //mac dinh la false (type = password)
        }
    }

    handleOnChangeUser = (event) => {
        this.setState({ // set trang thai cho cac state trong handleOnChangeUser
            username: event.target.value // ghi lai tung thay doi cua user
        })
        console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({ // set trang thai cho cac state
            password: event.target.value // ghi lai tung thay doi cua pw
        })
        console.log(event.target.value)
    }

    handleLogin = () => {
        console.log('username: ', this.state.username, 'password: ', this.state.password) // lay du lieu tu 2 input email va pw
        console.log('all state: ', this.state) //tra ve 1 object

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword // isShowPw: true ->  'far fa-eye', !this.state.isShowPassword:fale->  'far fa-eye splash'
        })
    }

    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center login-text">Login</div>

                        {/* UserName */}
                        <div className="col-12 form-group login-input">
                            <label>User Name:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username} //
                                onChange={(event) => this.handleOnChangeUser(event)} // 
                            />
                        </div>

                        {/* Password */}
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-pswd">
                                <input type={this.state.isShowPassword ? 'text' : 'password'} // neu nhan vao con mat thi type = text (hien chu) va nguoc lai
                                    className="form-control"
                                    placeholder="Enter your password"
                                    onChange={(event) => this.handleOnChangePassword(event)} />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }} //onClick nay xay ra 2 TH
                                >
                                    <i class={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="col-12">
                            <button className="btn-login"
                                onClick={() => { this.handleLogin() }} //onClick nay tra ve kq
                            >Login</button>
                        </div>

                        {/* FYP */}
                        <div className="col-12">
                            <span className="fyp">Forget your password ?</span>
                        </div>

                        <div className="col-12 text-center">
                            <span className="other-login">Or login with</span>
                        </div>

                        <div className="col-12 socia-icon">
                            <i class="fab fa-google gg-icon"></i>
                            <i class="fab fa-facebook fb-icon"></i>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
