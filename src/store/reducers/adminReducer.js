import actionTypes from '../actions/actionTypes';

const initialState = { // khia bao cac state can su dung
    genders: [],
    roles: [],
    position: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('check start', action)
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state } // tao ham chua cac dlieu cua initialState 
            copyState.genders = action.data // thay doi bien gender cua ham copy = bien gender cua adminAction sau khi hung du lieu 
            console.log('check success', copyState)
            return {
                ...copyState // tra ra cac bien genders sau khi thay doi 
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('check failed', action)
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;