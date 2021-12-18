import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';


class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleidArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart() //khai bao de react yeu cau lay dl cho redux biet
        this.props.getPositionStart()
        this.props.getRoleStart()
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
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders, //gan cac gtri cua redux cho state react
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
                // check co gtri cua redux co hay k, neu co gan gtri dau tien cho state gender
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPos = this.props.positionRedux
            this.setState({
                positionArr: arrPos,
                position: arrPos && arrPos.length > 0 ? arrPos[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleidArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) { //sau khi them user thi listUser co su thay doi trong database -> set lai cac state
            let arrPos = this.props.positionRedux
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '', //set lai gtri dau tien
                position: arrPos && arrPos.length > 0 ? arrPos[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            })
        }
    }

    handleChangeImage = async (event) => {
        let data = event.target.files //lay file
        let file = data[0] //lay file anh dau tien
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64 //set state cho avatar la file 
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return // neu k co anh se k the hien thi 
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return // false thi se k tra ve gtri

        let { action } = this.state // let action = this.state.action

        if (action === CRUD_ACTIONS.CREATE) { // action === 'create'
            // isValid: true -> call api from redux
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber, //phonenumber: nodejs, phoneNumber:react
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                previewImgUrl: this.state.previewImgUrl,
                avatar: this.state.avatar
            })
        }

        if (action === CRUD_ACTIONS.UPDATE) { // action === 'update'
            this.props.editUser({
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber, //phonenumber: nodejs, phoneNumber:react
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) { //loop
            if (!this.state[arrCheck[i]]) { //neu k co cac gia tri trong loop
                isValid = false //set gtri false
                alert('Missing input parameter ' + arrCheck[i]) // tra ve thong bao
                break // stop loop
            }
        }

        return isValid
    }
    onChangeInput = (event, id) => {
        let cpState = { ...this.state } //tranh mutate state truc tiep
        cpState[id] = event.target.value //lay tung onChange cua cac state da khai bao o initialState
        this.setState({
            ...cpState // set lai cac state o init = cpState
        })
    }

    handleEditUserFromParent = (data) => {
        // console.log('check handleEditUserFromParent ', data) // cac props da dc truyen tu con sang 
        let imageBase64 = '';
        if (data.image) {
            imageBase64 = new Buffer(data.image, 'base64').toString('binary')
        }
        this.setState({
            id: data.id,
            email: data.email,
            password: '123',
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phonenumber,
            address: data.address,
            gender: data.gender,
            position: data.positionId,
            role: data.roleId,
            avatar: data.avatar,
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.UPDATE
        }, () => {
            console.log('check base64', this.state)
        })
    }

    render() {
        // let genders = this.state.genderArr
        // let positions = this.state.positionArr
        // let roleids = this.state.roleidArr
        let language = this.props.language
        let genderRedux = this.props.genderRedux
        let positionRedux = this.props.positionRedux
        let roleRedux = this.props.roleRedux

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state

        return (
            <div className='user-redux-container'>
                <div className="title" > User Redux </div>
                <div className='user-redux-body' >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 text-center'><FormattedMessage id='manage-user.title' /></div>
                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.UPDATE ? true : false}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.UPDATE ? true : false}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text'
                                    value={firstName} //value={this.state.firstName(id cua onCHange)}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number' /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className='form-control' value={gender}
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                    {genderRedux && genderRedux.length > 0 &&
                                        genderRedux.map((item, index) => {
                                            return (
                                                // value={thuoc tinh(key,name,id,...) cua item}
                                                <option key={index} value={item.keyMap}>

                                                    {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className='form-control' value={position}
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}>
                                    {positionRedux && positionRedux.length > 0 &&
                                        positionRedux.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>RoleID</label>
                                <select className='form-control' value={role}
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}>
                                    {roleRedux && roleRedux.length > 0 &&
                                        roleRedux.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                {/* <label><FormattedMessage id='manage-user.image' /></label> */}
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleChangeImage(event)} />
                                    <label className='label-upload' htmlFor='previewImg'><FormattedMessage id='manage-user.image' /><i className='fas fa-upload'></i></label>
                                    <div className='preview-image' style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openPreviewImage()} value={avatar}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12 pxy-3'>
                                <button
                                    className={this.state.action === CRUD_ACTIONS.UPDATE ? 'btn btn-warning my-3' : 'btn btn-primary my-3'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.UPDATE ?
                                        <FormattedMessage id='manage-user.edit' />
                                        :
                                        <FormattedMessage id='manage-user.btn-add' />
                                    }
                                </button>
                            </div>
                            <div className='col-12 my-5'>
                                <TableManageUser

                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}

                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders, // redux tra ve cac gia tri sau khi da lay tu api o day
        positionRedux: state.admin.positions, // redux tra ve cac gia tri sau khi da lay tu api o day
        roleRedux: state.admin.roles, // redux tra ve cac gia tri sau khi da lay tu api o day
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()), // gui yeu cau lay dl tu react sang redux
        getPositionStart: () => dispatch(actions.fetchPositionStart()), // gui yeu cau lay dl tu react sang redux
        getRoleStart: () => dispatch(actions.fetchRoleStart()), // gui yeu cau lay dl tu react sang redux
        createNewUser: (data) => dispatch(actions.createNewUser(data)),//fire action create from button
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),// get all user sau khi them user
        editUser: (data) => dispatch(actions.editUser(data)),// get all user sau khi them user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);