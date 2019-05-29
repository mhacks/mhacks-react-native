import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { userHasAnyOfGroups } from '../utils/User';
import Announcement from '../components/Announcement';
import { fetchAnnouncements } from '../actions/Announcements';
import HeaderButton from '../components/HeaderButton';
import CreateAnnouncementScreen from './CreateAnnouncement';

class AnnouncementsScreen extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <FlatList
                    data={this.props.announcements}
                    keyExtractor={(item, id) => item.id}
                    renderItem={({ item }) => <Announcement title={item.title} body={item.body} time={new Date(item.broadcastTime_ts)} category={item.category} />}
                    onRefresh={() => this.props.dispatch(fetchAnnouncements())}
                    refreshing={this.props.isFetching}
                    contentContainerStyle={{ paddingBottom: 10 }}
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
            headerRight: (
                <HeaderButton
                    iconName='create'
                    navigateTo='CreateAnnouncement'
                    shouldRender={state => {
                        const { auth } = state;
                        return auth.user !== null && userHasAnyOfGroups(auth.user, 'admin');
                    }}
                />
            ),
        }
    },
    CreateAnnouncement: {
        screen: CreateAnnouncementScreen,
        navigationOptions: {
            title: 'Create Announcement',
        }
    }
});