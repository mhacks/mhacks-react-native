import ActionTypes from './types';
import Endpoints from '../config/endpoints';
import Config from '../config/config';

export const fetchEvents = () => {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_EVENTS_REQUEST });

        return fetch(Endpoints.EVENTS())
            .then(response => response.json())
            .then(responseJSON => {
                const events = responseJSON.events;

                dispatch({ type: ActionTypes.FETCH_EVENTS_SUCCESS, payload: events });
            })
            .catch(error => dispatch({ type: ActionTypes.FETCH_EVENTS_ERROR, payload: error }));
    };
}