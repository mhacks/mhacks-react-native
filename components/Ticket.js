import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import { Brightness } from 'expo';

import Config from '../config/config';

class Ticket extends React.Component {

    state = {
        originalBrightness: 0.5,
    };

    constructor(props) {
        super(props);

        // Crank the brightness when page is 
        // navigated to so it's easier to scan.
        // This seems to randomly not work on
        // dev builds, but it seems fine on prod
        this.props.navigation.addListener("didFocus", () => {
            // On Android we need to get the system brightness,
            // as if we haven't set a per-app brightness
            // getBrightnessAsync returns -1.
            const brightnessPromise = Platform.OS === 'android'
                ? Brightness.getSystemBrightnessAsync()
                : Brightness.getBrightnessAsync();

            brightnessPromise.then(brightness => {
                this.setState({ originalBrightness: brightness });
                Brightness.setBrightnessAsync(1)
            })
        });

        this.props.navigation.addListener("didBlur", () => {
            Brightness.setBrightnessAsync(this.state.originalBrightness);
        });
    }

    render() {
        // Make sure that we're logged in, mostly a sanity check
        if (!this.props.isLoggedIn) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>No user logged in!</Text>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.ticketContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>HACKER</Text>
                            <Text style={styles.field}>{this.props.user.full_name}</Text>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>SCHOOL</Text>
                            <Text style={styles.field}>{this.props.user.university && this.props.user.university != '' ? this.props.user.university : 'Unknown'}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.qrCode}>
                            <QRCode
                                bgColor={Config.COLORS.TICKET.QR_CODE}
                                size={150}
                                value={this.props.user.email}
                            />
                        </View>
                    </View>
                </View>
            </View>
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

export default connect(mapStateToProps)(Ticket);

const styles = StyleSheet.create({
    ticketContainer: {
        flexShrink: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: Config.COLORS.TICKET.BACKGROUND,
        alignItems: 'stretch',
        margin: 10,
        borderRadius: 15,
    },
    infoContainer: {
        margin: 20,
    },
    fieldContainer: {
        marginTop: 5,
        marginBottom: 5,
    },
    fieldHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    field: {
        fontSize: 24,
        color: '#fff',
    },
    qrCode: {
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',

        // Fix rendering bug on Android
        // https://github.com/cssivision/react-native-qrcode/issues/68
        overflow: 'hidden',
    }
});