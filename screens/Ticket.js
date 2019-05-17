import React from 'react';
import { createStackNavigator, createSwitchNavigator, withNavigation } from 'react-navigation';

import LoginScreen from './LoginScreen';
import Ticket from '../components/Ticket';
import AuthLoadingScreen from './AuthLoadingScreen';
import LogoutButton from '../components/LogoutButton';

const ticketStackNavigator = createStackNavigator({
    Ticket: {
        screen: Ticket,
        navigationOptions: {
            title: 'Ticket',
            headerRight: <LogoutButton />,
        },
    },
});

export default createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    Ticket: ticketStackNavigator,
}, {
        initialRouteName: 'AuthLoading',
    });