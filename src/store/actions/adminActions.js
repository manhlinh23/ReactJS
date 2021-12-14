import actionTypes from './actionTypes';
import { getAllCodeServives } from '../../services/userService'

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
