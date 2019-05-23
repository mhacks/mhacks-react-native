import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { userHasAnyOfGroups } from '../utils/User';
import { getPlatformSpecificIconName } from '../utils/Icons';

class CreateAnnouncementButton extends React.Component {

    render() {
        if (!this.props.isAdmin) {
            return null;
        }

        return (
            <TouchableOpacity onPress={this._createAnnouncementButtonPress}>
                <Ionicons
                    name={getPlatformSpecificIconName('create')}
                    style={{ padding: 10 }}
                    size={20}
                />
            </TouchableOpacity>
        );
    }

    _createAnnouncementButtonPress = () => {
        this.props.navigation.navigate('CreateAnnouncement');
    }

}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        isAdmin: auth.user !== null && userHasAnyOfGroups(auth.user, 'admin'),
    };
}

export default withNavigation(connect(mapStateToProps)(CreateAnnouncementButton));