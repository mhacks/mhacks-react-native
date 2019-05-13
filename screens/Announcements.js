import React from 'react';
import { View, Text, Header, Platform } from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';
import { FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { connect } from 'react-redux';

import Announcement from '../components/Announcement';
import { fetchAnnouncements } from '../actions/Announcements';

class AnnouncementsScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <FlatList
                    data={this.props.announcements}
                    keyExtractor={(item, id) => item.id}
                    renderItem={({ item }) => <Announcement title={item.title} body={item.body} time={new Date(item.createdAt_ts)} category={item.category} />}
                    onRefresh={() => this.props.dispatch(fetchAnnouncements())}
                    refreshing={this.props.isFetching}
                    ListEmptyComponent={<Text style={{ margin: 20, textAlign: 'center' }}>No announcements yet, stick tight!</Text>}
                />
            </View>
        );
    }

}

function mapStateToProps(state) {
    const { announcements } = state;
    return {
        announcements: announcements.announcements,
        isFetching: announcements.isFetching,
    };
}

export default stackNavigator = createStackNavigator({
    Announcements: {
        screen: connect(mapStateToProps)(AnnouncementsScreen),
        navigationOptions: {
            title: 'Announcements',
            headerRight: (<Ionicons name={(Platform.OS === 'ios' ? 'ios' : 'md') + '-create'} style={{ padding: 10 }} size={20} />),
        }
    },
});