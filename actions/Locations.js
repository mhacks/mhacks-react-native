import ActionTypes from './types';
import Endpoints from '../config/endpoints';

export const fetchLocations = () => {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_LOCATIONS_REQUEST });

        return fetch(Endpoints.LOCATIONS)
            .then(response => response.json())
            .then(responseJSON => {
                let locations = responseJSON.locations;

                dispatch({ type: ActionTypes.FETCH_LOCATIONS_SUCCESS, payload: locations });
            })
            .catch(error => dispatch({ type: ActionTypes.FETCH_LOCATIONS_ERROR, payload: error }));
    };
}