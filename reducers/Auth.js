import ActionTypes from '../actions/types';

const INITIAL_STATE = {
    isAuthenticating: false,
    isLoggedIn: false,
    token: null,
    user: null,
    error: null,
};

export default authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_AUTH_REQUEST:
            return {
                ...state,
                isAuthenticating: true,
            };
        case ActionTypes.FETCH_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                isLoggedIn: true,
                token: action.payload.token,
                user: action.payload.user
            };
        case ActionTypes.FETCH_AUTH_ERROR:
            return {
                ...state,
                isAuthenticating: false,
                isLoggedIn: false,
                error: action.payload
            };
        default:
            return state;
    }
};