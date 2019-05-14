import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import Config from '../config/config';
import LoginScreen from './LoginScreen';

class TicketScreen extends React.Component {
    render() {
        if (!this.props.isLoggedIn) {
            return (
                <LoginScreen />
            );
        }

        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <QRCode
                    color={Config.COLORS.TICKET_QR_CODE_COLOR}
                    size={250}
                    value={this.props.user.email}
                />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        isLoggedIn: auth.isLoggedIn,
        user: auth.user,
    };
}

export default connect(mapStateToProps)(TicketScreen);