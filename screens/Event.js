import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import moment from 'moment';

import Config from '../config/config';

export default class EventScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const eventColor = Config.COLORS.EVENT_CATEGORY[navigation.getParam('event').category];

        return {
            headerTintColor: eventColor,
        };
    };

    render() {
        const { navigation } = this.props;
        const event = navigation.getParam('event');

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{event.name}</Text>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>{Config.DISPLAY_NAMES.EVENT_CATEGORY[event.category]}</Text>
                        <Svg height={12} width={12}>
                            <Circle
                                cx={6}
                                cy={6}
                                r={6}
                                fill={Config.COLORS.EVENT_CATEGORY[event.category]}
                            />
                        </Svg>
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>{moment(event.startDate_ts).format('dddd h:mm A')} to {moment(event.endDate_ts).format('h:mm A')} ({this.getRelativeTimeString(event)})</Text>
                    </View>
                    <View style={styles.summaryContainer}>
                        <Text style={styles.summary}>{event.summary}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

    getRelativeTimeString(event) {
        if (Date.now() < event.startDate_ts) {
            return 'starting ' + moment(event.startDate_ts).fromNow();
        }
        if (Date.now() > event.endDate_ts) {
            return 'event has ended';
        }
        return 'currently happening!';
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    titleContainer: {
        marginBottom: 5,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
    },
    categoryContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    category: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 5,
    },
    timeContainer: {
        marginBottom: 20,
    },
    time: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    summaryContainer: {},
    summary: {

    },
});