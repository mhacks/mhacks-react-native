import React from 'react';
import { StyleSheet, AsyncStorage, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { AppLoading } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import TabNavigator from './components/TabNavigator';
import rootReducer from './reducers';
import { fetchAnnouncements } from './actions/Announcements';
import { fetchConfiguration } from './actions/Configuration';
import { fetchEvents } from './actions/Events';
import { fetchLocations } from './actions/Locations';
import { fetchAuthFromToken } from './actions/Auth';

const AppContainer = createAppContainer(TabNavigator);

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default class App extends React.Component {

    state = {
        isReady: false,
    };

    // Fetch some non-essential information on startup
    componentDidMount() {
        store.dispatch(fetchAnnouncements());
        store.dispatch(fetchEvents());
        store.dispatch(fetchLocations());
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._fetchInitialReduxState}
                    onFinish={() => { this.setState({ isReady: true }) }}
                    onError={this._appLoadingError}
                />
            );
        }

        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }

    // Load configuration data before the app fully loads in.
    // This forces the app to wait until the data is received,
    // which we need for configuration data. For less critical
    // data like announcements and schedule, we shouldn't impact
    // loading time to wait for them, so we load them in 
    // componentDidMount and don't wait.
    //
    // I'm not sure that this is the best way to pull this
    // off, and we might want to figure out a more robust
    // solution for the future.
    async _fetchInitialReduxState() {
        // If token is persisted, fill auth store with
        // info about user
        const token = await AsyncStorage.getItem('@auth:token');

        let authPromise = null;
        if (token !== null) {
            authPromise = store.dispatch(fetchAuthFromToken(token));
        }

        return Promise.all([
            store.dispatch(fetchConfiguration()),
            authPromise
        ]);
    }

    _appLoadingError(error) {
        Alert.alert('Failed to retrieve application information. Make sure that your internet connection is working.');
        console.log(error);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
