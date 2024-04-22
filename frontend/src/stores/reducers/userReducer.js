import actionTypes from '../actions/typeActions';

const initialState = {
    isLoggedIn: false,
    userInfor: null,
    filter: null,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfor: action.userInfor
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfor: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfor: null
            }
        case actionTypes.USER_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }
}

export default appReducer;