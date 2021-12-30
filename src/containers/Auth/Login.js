import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { handleLoginApi } from '../../services/userService'
import { compose } from 'redux';
// import actionTypes from '../../store/actions/actionTypes';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', // gan state.username cho input email
            password: '', // gan state.password cho input pw
            isShowPassword: false, //mac dinh la false (type = password)
            errMessage: '',
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

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }

            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user) // luu ng dung vao redux
                console.log('login succeed')
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message // in thong bao loi len phan FE login voi state errMessage
                    })
                }
            }
        }

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword // isShowPw: true ->  'far fa-eye', !this.state.isShowPassword:fale->  'far fa-eye splash'
        })
    }

    handleEnter = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin()
        }
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
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleEnter(event)} />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }} //onClick nay xay ra 2 TH
                                >
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
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
                            <i className="fab fa-google gg-icon"></i>
                            <i className="fab fa-facebook fb-icon"></i>
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
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
