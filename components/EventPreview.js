import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Config from '../config/config';

export default class EventPreview extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title(this.props.event)}>{this.props.event.name}</Text>
                <Text style={styles.body(this.props.event)}>{this.props.event.desc}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
    },
    title: e => ({
        fontSize: 17,
        fontWeight: '500', // medium
        color: Date.now() > e.endDate_ts
            ? Config.COLORS.EVENT_DISABLED
            : '#000',
        marginBottom: 5,
    }),
    body: e => ({
        fontSize: 15,
        color: Date.now() > e.endDate_ts
            ? Config.COLORS.EVENT_DISABLED
            : '#000',
    }),
});