import React from 'react';
import {SafeAreaView, Text} from 'react-native';

export default class EventScreen extends React.Component {

render() {
    const {navigation} = this.props;
    const event = navigation.getParam('event');

    return (
        <SafeAreaView style={{flex:1, alignItems: 'center',justifyContent: 'center'}}>
            <Text>{event.title}</Text>
        </SafeAreaView>
    );
}

}