import React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, Platform } from 'react-native';
import EventCalendar from 'react-native-events-calendar'
import { createStackNavigator } from 'react-navigation';
import { Haptic } from 'expo';
import { connect } from 'react-redux';

import EventScreen from './Event';

class ScheduleScreen extends React.Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <EventCalendar
                    events={this.props.events}
                    width={Dimensions.get('window').width}
                    initDate={this.props.startDate}
                    eventTapped={this._eventTapped}
                    dateChanged={this._eventDateChanged}
                    styles={{ eventTitle: styles.black, eventSummary: styles.black, eventTimes: styles.black }}
                />
            </SafeAreaView >
        );
    }

    _eventTapped = (e) => {
        this.props.navigation.navigate('Event', {
            event: e
        })
    }

    _eventDateChanged = (e) => {
        if (Platform.OS === 'ios') {
            Haptic.impact(Haptic.ImpactFeedbackStyle.Light)
        }
    }

}

function mapStateToProps(state) {
    const { events, configuration } = state;
    return {
        events: events.events,
        isFetching: events.isFetching,
        startDate: configuration.configuration !== null
            ? Date.parse(configuration.configuration.start_date)
            : new Date(),
    };
}

export default createStackNavigator({
    Schedule: {
        screen: connect(mapStateToProps)(ScheduleScreen),

        // We don't really need a header on the full schedule page
        navigationOptions: {
            header: null
        }
    },
    Event: EventScreen
});

const styles = StyleSheet.create({
    black: {
        color: '#000'
    }
});