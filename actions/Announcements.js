import ActionTypes from './types';
import Endpoints from '../config/endpoints';

export const fetchAnnouncements = () => {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_ANNOUNCEMENTS_REQUEST });

        return fetch(Endpoints.ANNOUNCEMENTS)
            .then(response => response.json())
            .then(responseJSON => {
                let announcements = responseJSON.announcements;

                // Sort announcements from newest to oldest, just a sanity check
                announcements.sort(function (a, b) {
                    return b.createdAt_ts - a.createdAt_ts;
                })

                dispatch({ type: ActionTypes.FETCH_ANNOUNCEMENTS_SUCCESS, payload: announcements });
            })
            .catch(error => dispatch({ type: ActionTypes.FETCH_ANNOUNCEMENTS_ERROR, payload: error }))
    };
}