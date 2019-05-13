import ActionTypes from '../actions/types';

const INITIAL_STATE = {
    locations: [],
    fetched: false,
    error: null,
};

export default locationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_LOCATIONS_REQUEST:
            return {
                ...state,
            };
        case ActionTypes.FETCH_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: action.payload,
                fetched: true
            };
        case ActionTypes.FETCH_LOCATIONS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};