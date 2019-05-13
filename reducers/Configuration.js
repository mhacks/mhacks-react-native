import ActionTypes from '../actions/types';

const INITIAL_STATE = {
    configuration: null,
    error: null,
};

export default configurationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CONFIGURATION_REQUEST:
            return {
                ...state,
            };
        case ActionTypes.FETCH_CONFIGURATION_SUCCESS:
            return {
                ...state,
                configuration: action.payload,
            };
        case ActionTypes.FETCH_CONFIGURATION_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};