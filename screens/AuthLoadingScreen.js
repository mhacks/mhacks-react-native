import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import { connect } from 'react-redux'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigation.navigate(this.props.isLoggedIn ? 'Ticket' : 'Login');
    }

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        isLoggedIn: auth.isLoggedIn,
    };
}

export default connect(mapStateToProps)(AuthLoadingScreen);