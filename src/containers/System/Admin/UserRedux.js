import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeServives } from '../../../services/userService'
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleidArr: []
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        // try {
        //     let res = await getAllCodeServives("gender")
        //     let res1 = await getAllCodeServives("position")
        //     let res2 = await getAllCodeServives("role")
        //     if (res && res.errCode === 0
        //         && res1 && res1.errCode === 0
        //         && res2 && res2.errCode === 0
        //     ) {
        //         this.setState({
        //             genderArr: res.data,
        //             positionArr: res1.data,
        //             roleidArr: res2.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        //sau khi lay dc props tu redux thi react se so sanh cac state va sau do update cac state -> render 
        /** render -> didupdate
         * hien tai (this) va qua khu (previous)
         * so sanh lan dau [] va [3]
         * so sanh lan 2 [3] [3] ngung chay ham
         */

        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }


    render() {
        // let genders = this.state.genderArr
        // let positions = this.state.positionArr
        // let roleids = this.state.roleidArr
        let language = this.props.language
        let genderRedux = this.props.genderRedux
        console.log('check genderRedux', this.props.genderRedux)
        return (
            <div className='user-redux-container'>
                <div className="title" > User Redux </div>
                <div className='user-redux-body' >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 text-center'><FormattedMessage id='manage-user.title' /></div>
                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control' type='email'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number' /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className='form-control'>
                                    {genderRedux && genderRedux.length > 0 &&
                                        genderRedux.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className='form-control'>
                                    {/* {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                                </option>
                                            )
                                        })
                                    } */}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>RoleID</label>
                                <select className='form-control'>
                                    {/* {roleids && roleids.length > 0 &&
                                        roleids.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                                </option>
                                            )
                                        })
                                    } */}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-12 pxy-3'>
                                <button className='btn btn-primary my-3'><FormattedMessage id='manage-user.btn-add' /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders, // redux tra ve cac gia tri sau khi da lay tu api o day
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()) // gui yeu cau lay dl tu react sang redux
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);