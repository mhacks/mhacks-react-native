import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

import Config from '../config/config';

export default class Announcement extends React.Component {

    render() {
        return (
            <View style={[styles.container, { backgroundColor: Config.COLORS.ANNOUNCEMENT_BY_CATEGORY[this.props.category] }]}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.body}>{this.props.body}</Text>
                <Text style={styles.timestamp}>{moment(this.props.time).format('dddd h:mm A')}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        marginBottom: 0,
        borderRadius: 5,
    },
    title: {
        fontSize: 22,
        margin: 10,
        fontWeight: '500', // medium
    },
    body: {
        fontSize: 15,
        margin: 10,
        marginTop: 0,
    },
    timestamp: {
        fontSize: 13,
        marginLeft: 10,
        marginBottom: 10,
        color: '#fff'
    },
});