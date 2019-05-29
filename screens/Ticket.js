import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import Ticket from '../components/Ticket';
import AuthLoadingScreen from './AuthLoadingScreen';
import HeaderButton from '../components/HeaderButton';
import { logout } from '../actions/Auth';

const ticketStackNavigator = createStackNavigator({
    Ticket: {
        screen: Ticket,
        navigationOptions: {
            title: 'Ticket',
            headerRight: (
                <HeaderButton
                    iconName='log-out'
                    navigateTo='Login'
                    action={logout}
                    shouldRender={() => true}
                />
            ),
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