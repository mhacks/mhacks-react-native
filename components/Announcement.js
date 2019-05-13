import React from 'react';
import { View, Text } from 'react-native';

import Config from '../config/config';

export default class Announcement extends React.Component {

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: Config.COLORS.ANNOUNCEMENT_BY_CATEGORY[this.props.category],
                margin: 10,
                marginBottom: 0,
                borderRadius: 5,
            }}>
                <Text style={{ fontSize: 20, margin: 10, fontWeight: 'bold' }}>{this.props.title}</Text>
                <Text style={{ fontSize: 14, margin: 10, marginTop: 0 }}>{this.props.body}</Text>
                <Text style={{ fontSize: 8, marginLeft: 10, marginBottom: 10, fontWeight: 'bold', color: '#fff' }}>{this.props.time.toDateString() + ' ' + this.props.time.toLocaleTimeString()}</Text>
            </View>
        );
    }

}