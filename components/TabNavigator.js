import React from 'react';
import {Platform} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Ionicons, Entypo } from '@expo/vector-icons';

import ScheduleScreen from '../screens/Schedule';
import MapScreen from '../screens/Map';
import CountdownScreen from '../screens/Countdown';
import AnnouncementsScreen from '../screens/Announcements';
import TicketScreen from '../screens/Ticket';

import Config from '../config/config';

// Gets the name of the icon for the specific platform.
// If iOS, returns ios-name, else md-name.
function getPlatformIconName(name) {
    return (Platform.OS === 'ios' ? 'ios' : 'md') + '-' + name;
}

export default createBottomTabNavigator({
    Schedule: {
        screen: ScheduleScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name={getPlatformIconName('calendar')} color={tintColor} size={Config.TAB_NAVIGATOR_ICON_SIZE} />
            )
        }
    },
    Map: {
        screen: MapScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name={getPlatformIconName('pin')} color={tintColor} size={Config.TAB_NAVIGATOR_ICON_SIZE} />
            )
        }
    },
    Countdown: {
        screen: CountdownScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name={getPlatformIconName('hourglass')} color={tintColor} size={Config.TAB_NAVIGATOR_ICON_SIZE} />
            )
        }
    },
    News: {
        screen: AnnouncementsScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name={getPlatformIconName('notifications')} color={tintColor} size={Config.TAB_NAVIGATOR_ICON_SIZE} />
            )
        }
    },
    Ticket: {
        screen: TicketScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Entypo name='ticket' color={tintColor} size={Config.TAB_NAVIGATOR_ICON_SIZE} />
            )
        }
    },
}, {
        tabBarOptions: {
            activeTintColor: Config.COLORS.TAB_BAR_ICON_COLOR
        },
        initialRouteName: 'Countdown',
    });