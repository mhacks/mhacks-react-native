import ActionTypes from '../actions/types';

const INITIAL_STATE = {
    events: null,
    isFetching: false,
    error: null,
};

export default eventsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_EVENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ActionTypes.FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.payload,
                isFetching: false,
            };
        case ActionTypes.FETCH_EVENTS_ERROR:
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            };
        default:
            return state;
    }
};