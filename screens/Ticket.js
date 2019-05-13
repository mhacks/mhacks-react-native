import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-navigation';

import Config from '../config/config'

export default class TicketScreen extends React.Component {
    render() {
        let logo = require('../assets/favicon.png');
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <QRCode
                    color={Config.COLORS.TICKET_QR_CODE_COLOR}
                    size={250}
                    value='hackathon@umich.edu'
                />
            </SafeAreaView>
        )
    }
}