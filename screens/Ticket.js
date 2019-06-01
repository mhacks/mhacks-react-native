import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import Ticket from '../components/Ticket';
import TicketScannerScreen from './TicketScanner';
import AuthLoadingScreen from './AuthLoadingScreen';
import HeaderButton from '../components/HeaderButton';
import { logout } from '../actions/Auth';
import { userHasAnyOfGroups } from '../utils/User';

const ticketStackNavigator = createStackNavigator({
    Ticket: {
        screen: Ticket,
        navigationOptions: {
            title: 'Ticket',
            headerLeft: (
                <HeaderButton
                    iconName='qr-scanner'
                    navigateTo='Scanner'
                    shouldRender={state => {
                        const { auth } = state;
                        return auth.user !== null && userHasAnyOfGroups(auth.user, 'admin', 'scanner');
                    }}
                />
            ),
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
    Scanner: {
        screen: TicketScannerScreen,
        navigationOptions: {
            header: null,
        }
    },
});

export default createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    Ticket: ticketStackNavigator,
}, {
        initialRouteName: 'AuthLoading',
    });