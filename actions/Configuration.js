import ActionTypes from './types';
import Endpoints from '../config/endpoints';

export const fetchConfiguration = () => {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_CONFIGURATION_REQUEST });

        return fetch(Endpoints.CONFIGURATION)
            .then(response => response.json())
            .then(responseJSON => {
                let configuration = responseJSON.configuration;

                dispatch({ type: ActionTypes.FETCH_CONFIGURATION_SUCCESS, payload: configuration });
            })
            .catch(error => dispatch({ type: ActionTypes.FETCH_CONFIGURATION_ERROR, payload: error }));
    };
}