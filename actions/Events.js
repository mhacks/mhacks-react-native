import ActionTypes from './types';
import Endpoints from '../config/endpoints';
import Config from '../config/config';

export const fetchEvents = () => {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_EVENTS_REQUEST });

        return fetch(Endpoints.EVENTS)
            .then(response => response.json())
            .then(responseJSON => {
                let events = responseJSON.events;

                let eventsConverted = events.map(x => ({
                    start: new Date(x.startDate_ts),
                    end: new Date(x.endDate_ts),
                    title: x.name,
                    summary: x.desc,
                    category: x.category,
                    color: Config.COLORS.EVENT_BY_CATEGORY[x.category]
                }));

                dispatch({ type: ActionTypes.FETCH_EVENTS_SUCCESS, payload: eventsConverted });
            })
            .catch(error => dispatch({ type: ActionTypes.FETCH_EVENTS_ERROR, payload: error }));
    };
}