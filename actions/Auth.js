import { AsyncStorage } from 'react-native';

import ActionTypes from './types';
import Endpoints from '../config/endpoints';

// Use an email and password to fetch a token
// and information about the user. Stores the
// token in AsyncStorage on success.
export const fetchAuthFromEmailPassword = (email, password) => {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_AUTH_REQUEST });

        return fetch(Endpoints.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then(response => {
                if (response.status != 200) {
                    throw new Error(response.status);
                }

                return response.json();
            })
            .then(responseJSON => {
                const { token, user } = responseJSON;

                dispatch({
                    type: ActionTypes.FETCH_AUTH_SUCCESS,
                    payload: {
                        token: token,
                        user: user,
                    }
                });

                AsyncStorage.setItem('@auth:token', token);
            })
            .catch(error => {
                dispatch({ type: ActionTypes.FETCH_AUTH_ERROR, payload: error });
                throw error;
            });
    };
}

// Use an already-grabbed token to get
// information about the user.
export const fetchAuthFromToken = (token) => {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_AUTH_REQUEST });

        return fetch(Endpoints.CURRENT_USER_PROFILE, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(response => {
                if (response.status != 200) {
                    throw new Error(response.status);
                }

                return response.json();
            })
            .then(responseJSON => {
                const { user } = responseJSON;

                dispatch({
                    type: ActionTypes.FETCH_AUTH_SUCCESS,
                    payload: {
                        token: token,
                        user: user,
                    }
                });
            })
            .catch(error => dispatch({ type: ActionTypes.FETCH_AUTH_ERROR, payload: error }));
    };
}