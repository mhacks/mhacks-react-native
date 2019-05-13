import ActionTypes from '../actions/types';

const INITIAL_STATE = {
    announcements: [],
    isFetching: false,
    error: null,
};

export default announcementsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ANNOUNCEMENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ActionTypes.FETCH_ANNOUNCEMENTS_SUCCESS:
            return {
                ...state,
                announcements: action.payload,
                isFetching: false,
            };
        case ActionTypes.FETCH_ANNOUNCEMENTS_ERROR:
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            };
        default:
            return state;
    }
};