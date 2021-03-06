import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

import Config from '../config/config';

export default class Announcement extends React.Component {

    render() {
        return (
            <View style={[styles.container, { backgroundColor: Config.COLORS.ANNOUNCEMENT_CATEGORY[this.props.category] }]}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.category}>{Config.DISPLAY_NAMES.ANNOUNCEMENT_CATEGORY[this.props.category]}</Text>
                <Text style={styles.body}>{this.props.body}</Text>
                <Text style={styles.timestamp}>{moment(this.props.time).calendar()}</Text>
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
        marginBottom: 0,
    },
    category: {
        fontSize: 17,
        margin: 10,
        marginTop: 5,
        fontWeight: '600', // semi bold
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
        color: '#fff',
    },
});