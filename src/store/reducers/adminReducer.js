import actionTypes from '../actions/actionTypes';

const initialState = { // khia bao cac state can su dung
    genders: [],
    roles: [],
    positions: [],
    users: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            // console.log('check start', action)
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state } // tao ham chua cac dlieu cua initialState 
            copyState.genders = action.data // thay doi bien gender cua ham copy = bien gender cua adminAction sau khi hung du lieu 
            // console.log('check success', copyState)
            return {
                ...copyState // tra ra cac bien genders sau khi thay doi 
            }
        case actionTypes.FETCH_GENDER_FAILED:
            // console.log('check failed', action)
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            // console.log('check failed', action)
            state.positions = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            // console.log('check failed', action)
            state.roles = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            // console.log('check failed', action)
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.data // action.data (data phai giong vs data ben action)
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;