import actionTypes from './actionTypes';
import { getTopDoctorHomeService, getAllCodeServives, createNewUserServices, getAllUsers, deleteUserServices, editUserServices } from '../../services/userService'
import { toast } from "react-toastify";

// gender

export const fetchGenderSuccess = (data) => ({ // truyen ten cua action va gtri dau vao
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
//position

export const fetchPositionSuccess = (dataPos) => ({ // truyen ten cua action va gtri dau vao
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: dataPos
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
//role


export const fetchRoleSuccess = (data) => ({ // truyen ten cua action va gtri dau vao
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const createUserSuccess = () => ({ // truyen ten cua action va gtri dau vao
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersSuccess = (data) => ({ // truyen ten cua action va gtri dau vao
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})
export const deleteUserSuccess = () => ({ // truyen ten cua action va gtri dau vao
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const editUserSuccess = () => ({ // truyen ten cua action va gtri dau vao
    type: actionTypes.UPDATE_USER_SUCCESS,
})
export const editUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeServives("gender") //hung du lieu sau khi goi api
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data)) // gan gtri vao ham success
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart', error)
        }
    }
}
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeServives("position") //hung du lieu sau khi goi api
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data)) // gan gtri vao ham success
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart', error)
        }
    }
}
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeServives("role") //hung du lieu sau khi goi api
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data)) // gan gtri vao ham success
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed', error)
        }
    }
}

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("all") //hung du lieu sau khi goi api
            if (res && res.errCode === 0) {
                console.log('check res actions', res)
                dispatch(fetchAllUsersSuccess(res.users.reverse())) // gan gtri vao ham success, sap xep nguoc lai
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersStart', error)
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserServices(data) //hung du lieu sau khi goi api
            console.log('check res createNewUser', res)
            if (res && res.errCode === 0) {
                toast.success("CREATE SUCCESS");
                dispatch(createUserSuccess()) // create user
                dispatch(fetchAllUsersStart()) // refresh page
            } else {
                dispatch(createUserFailed());
            }
        } catch (error) {
            dispatch(createUserFailed());
            console.log('createNewUser', error)
        }
    }
}
export const deleteUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserServices(data) //hung du lieu sau khi goi api
            if (res && res.errCode === 0) {
                toast.success("DELETE SUCCESS");
                dispatch(deleteUserSuccess()) // delete user
                dispatch(fetchAllUsersStart()) // refresh page
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log('deleteUser', error)
        }
    }
}
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserServices(data) //hung du lieu sau khi goi api
            console.log('check res editUser', res)
            if (res && res.errCode === 0) {
                toast.success("EDIT SUCCESS");
                dispatch(editUserSuccess()) // delete user
                dispatch(fetchAllUsersStart()) // refresh page
            } else {
                toast.warn("EDIT FAIL");
                dispatch(editUserFailed());
            }
        } catch (error) {
            dispatch(editUserFailed());
            console.log('editUser', error)
        }
    }
}

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(3)
            console.log('fetchTopDoctor', res)
            if (res && res.errCode === 0) {
                dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS, dataDoctors: res.data })
            } else {
                dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED })
            }

        } catch (error) {
            console.log('Error fetchTopDoctor', error)
            dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED })
        }
    }
}
