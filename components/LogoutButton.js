import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import { logout } from '../actions/Auth';

class LogoutButton extends React.Component {

    render() {
        return (
            <TouchableOpacity onPress={this._logoutButtonPress}>
                <Entypo
                    name='log-out'
                    style={{ padding: 10 }}
                    size={20}
                />
            </TouchableOpacity>
        );
    }

    _logoutButtonPress = async () => {
        this.props.dispatch(logout());
        this.props.navigation.navigate('Login');
    }

}

export default withNavigation(connect(null)(LogoutButton));