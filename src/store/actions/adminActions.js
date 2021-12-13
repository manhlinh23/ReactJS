import actionTypes from './actionTypes';
import { getAllCodeServives } from '../../services/userService'


export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeServives("GENDER") //hung du lieu sau khi goi api
            console.log('check res: ', res)
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
export const fetchGenderSuccess = (data) => ({ // truyen ten cua action va gtri dau vao
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
