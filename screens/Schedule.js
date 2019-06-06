import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import moment from 'moment';

import EventPreview from '../components/EventPreview';
import EventScreen from './Event';
import { fetchEvents } from '../actions/Events';
import Config from '../config/config';

class ScheduleScreen extends React.Component {

    render() {
        return (
            <FlatList
                data={Array.from(this.props.events, ([k, v], index) => ({ key: index, day: k, events: v }))}
                onRefresh={() => this.props.dispatch(fetchEvents())}
                refreshing={this.props.isFetching}
                renderItem={({ item }) => (
                    <View
                        style={styles.dayContainer}
                    >
                        <Text style={styles.day}>{moment(item.day).format('dddd')}</Text>
                        <View style={styles.daySeparator} />
                        <Timeline
                            data={item.events}
                            renderDetail={rowData => (
                                <EventPreview
                                    event={rowData.rawEvent}
                                />
                            )}
                            onEventPress={this._eventTapped}
                            timeStyle={styles.time}
                            timeContainerStyle={{ minWidth: 60 }}
                            separator={true}
                            separatorStyle={{ height: StyleSheet.hairlineWidth }}
                            innerCircle='dot'
                            options={{ removeClippedSubviews: false }}
                        />
                    </View>
                )}
            />
        );
    }

    _eventTapped = e => {
        this.props.navigation.navigate('Event', {
            event: e.rawEvent,
        });
    }

}

function mapStateToProps(state) {
    const { events } = state;

    const dayToEventsMap = new Map();

    events.events.forEach(e => {
        const startDate = new Date(e.startDate_ts);
        const endDate = new Date(e.endDate_ts);

        const eventOver = Date.now() > endDate;
        const eventOngoing = !(eventOver || (Date.now() < startDate));

        const event = {
            time: moment(startDate).format('h:mm A') + '\n–\n' + moment(endDate).format('h:mm A'),
            title: e.name,
            description: e.desc,
            lineColor: Config.DISABLE_PAST_EVENTS && eventOver
                ? Config.COLORS.EVENT_DISABLED
                : Config.COLORS.EVENT_CATEGORY[e.category],
            circleColor: Config.DISABLE_PAST_EVENTS && eventOver
                ? Config.COLORS.EVENT_DISABLED
                : Config.COLORS.EVENT_CATEGORY[e.category],
            dotColor: Config.DISABLE_PAST_EVENTS && eventOver
                ? Config.COLORS.EVENT_DISABLED
                : eventOngoing
                    ? '#fff'
                    : Config.COLORS.EVENT_CATEGORY[e.category],
            rawEvent: e,
        };

        const dayFormatted = moment(startDate).format('YYYY-MM-DD');
        dayToEventsMap.set(dayFormatted, (dayToEventsMap.get(dayFormatted) || []).concat(event));

        // For each day, sort events primarily by
        // start time and secondarily by end time.
        // Therefore, events starting at the same time
        // will be sorted by which ends first.
        dayToEventsMap.forEach((v, k) => {
            v.sort((a, b) => {
                if (a.rawEvent.startDate_ts < b.rawEvent.startDate_ts) return -1;
                if (a.rawEvent.startDate_ts > b.rawEvent.startDate_ts) return 1;

                if (a.rawEvent.endDate_ts < b.rawEvent.endDate_ts) return -1;
                if (a.rawEvent.endDate_ts > b.rawEvent.endDate_ts) return 1;

                return 0;
            });
        });
    });

    return {
        events: dayToEventsMap,
        isFetching: events.isFetching,
    };
}

export default createStackNavigator({
    Schedule: {
        screen: connect(mapStateToProps)(ScheduleScreen),
        navigationOptions: {
            title: 'Schedule'
        }
    },
    Event: {
        screen: EventScreen,
        navigationOptions: {
            title: 'Event',
        },
    }
});

const styles = StyleSheet.create({
    dayContainer: {
        flex: 1,
        alignItems: 'stretch',
        margin: 10,
    },
    day: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    daySeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#000',
        marginBottom: 20,
    },
    time: {
        fontSize: 13,
        color: '#7F8489',
    },
});