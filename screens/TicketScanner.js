import React from 'react';
import { Alert, Platform, Text, StyleSheet, Vibration, Animated, View, Dimensions } from 'react-native';
import KeepAwake from 'expo-keep-awake';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';

import Config from '../config/config';
import Endpoints from '../config/endpoints';

class TicketScannerScreen extends React.Component {

    state = {
        hasCameraPermission: null,
        disabled: false,
        blurred: false,
        border: {
            color: '#0f0',
            width: new Animated.Value(0),
            opacity: new Animated.Value(0),
        },
        infoPopup: {
            name: '',
            email: '',
            bottomMargin: new Animated.Value(-75),
        },
    };

    constructor(props) {
        super(props);

        // If we don't have this, the scanner continues
        // to scan in the background when we switch screens.
        this.props.navigation.addListener('didFocus', () => {
            this.setState({ blurred: false });
        });

        this.props.navigation.addListener('willBlur', () => {
            this.setState({ blurred: true });
        });
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }


    render() {
        const { hasCameraPermission, disabled, blurred } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        return (
            <>
                <KeepAwake />
                <Animated.View style={[styles.infoPopupContainer, {
                    marginBottom: this.state.infoPopup.bottomMargin,
                }]}
                    zIndex={1}
                >
                    <View style={styles.infoPopup}>
                        <Text style={styles.infoPopupText}>
                            Name: {this.state.infoPopup.name}
                        </Text>
                        <Text style={styles.infoPopupText}>
                            Email: {this.state.infoPopup.email}
                        </Text>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[StyleSheet.absoluteFill, {
                        borderColor: this.state.border.color,
                        borderWidth: this.state.border.width,
                        opacity: this.state.border.opacity,

                        // Using zIndex is a tad hacky, however
                        // since react native doesn't support an
                        // outline property and using border width
                        // in a normal component hierarchy causes
                        // the inner width to change, this is
                        // pretty much our best option.
                        zIndex: 2,
                    }]}
                />
                <BarCodeScanner
                    onBarCodeScanned={disabled || blurred ? undefined : this._onBarCodeScanned}
                    style={[StyleSheet.absoluteFill, {
                        zIndex: 0,
                    }]}
                />
            </>
        );
    }

    flashBorder(color, duration) {
        this.setState({ border: { color: color, width: new Animated.Value(0), opacity: new Animated.Value(0) } });

        // How much of the total animation time
        // to spend fading in.
        const FADE_IN_LENGTH = 1 / 25;
        const FADE_OUT_LENGTH = 1 - FADE_IN_LENGTH;

        Animated.parallel([
            Animated.sequence([
                Animated.timing(
                    this.state.border.width,
                    {
                        toValue: 5,
                        duration: FADE_IN_LENGTH * duration,
                    }
                ),
                Animated.timing(
                    this.state.border.width,
                    {
                        toValue: 0,
                        duration: FADE_OUT_LENGTH * duration,
                    }
                ),
            ]),
            Animated.sequence([
                Animated.timing(
                    this.state.border.opacity,
                    {
                        toValue: 1,
                        duration: FADE_IN_LENGTH * duration,
                    }
                ),
                Animated.timing(
                    this.state.border.opacity,
                    {
                        toValue: 0,
                        duration: FADE_OUT_LENGTH * duration,
                    }
                ),
            ]),
        ]).start();
    }

    showInfoPopup(name, email, duration) {
        this.setState({ infoPopup: { name: name, email: email, bottomMargin: new Animated.Value(-75) } });

        Animated.sequence([
            Animated.timing(
                this.state.infoPopup.bottomMargin,
                {
                    toValue: Dimensions.get('window').width * 0.05,
                    duration: (1 / 8) * duration,
                }
            ),
            Animated.delay(Config.QR_SCANNER_REACTIVATE_DELAY * 2),
            Animated.timing(
                this.state.infoPopup.bottomMargin,
                {
                    toValue: -75,
                    duration: (1 / 8) * duration,
                }
            )
        ]).start();
    }

    _onBarCodeScanned = e => {
        this.setState({ isFetching: true, disabled: true });

        const email = e.data;

        fetch(Endpoints.TICKET_SCAN(), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
            .then(response => response.json())
            .then(responseJSON => {
                if (!responseJSON.status) {
                    throw responseJSON;
                }

                const name = responseJSON.feedback[0].value;

                this.flashBorder('#0f0', Config.QR_SCANNER_REACTIVATE_DELAY);
                this.showInfoPopup(name, email, Config.QR_SCANNER_REACTIVATE_DELAY);

                if (Platform.OS === 'ios') {
                    // TODO: replace with success Haptic.notification
                    // when Expo 33 comes out
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                } else {
                    Vibration.vibrate([0, 20, 100, 40]);
                }

                Audio.Sound.createAsync(
                    require('../assets/sounds/scan_success.m4a'),
                    { shouldPlay: true }
                );

                setTimeout(() => this.setState({ disabled: false }), Config.QR_SCANNER_REACTIVATE_DELAY);
            })
            .catch(error => {
                console.log(error);
                this.flashBorder('#f00', Config.QR_SCANNER_REACTIVATE_DELAY * 2);

                if (Platform.OS === 'ios') {
                    // TODO: put in failure Haptic.notification
                    // when Expo 33 comes out
                } else {
                    Vibration.vibrate([0, 50, 100, 50, 100, 60, 50, 100]);
                }

                Audio.Sound.createAsync(
                    require('../assets/sounds/scan_failure.m4a'),
                    { shouldPlay: true }
                );

                const errorMessages = {
                    'Unauthorized, email and password combination is invalid.': `Email ${email} is not registered with MHacks.`,
                    'You have not submitted your application yet!': `Hacker with email ${email} has not submitted their application for MHacks.`,
                    'You have not been accepted to the hackathon yet!': `Hacker with email ${email} has not been accepted to MHacks.`,
                    'You have not confirmed your application yet!': `Hacker with email ${email} has not confirmed their acceptance to MHacks.`,
                };

                const message = error.message in errorMessages ? errorMessages[error.message] : 'Unknown error.\n' + error.message;

                Alert.alert('Error', message, [
                    { text: 'OK', onPress: () => this.setState({ disabled: false }) },
                ],
                    { cancelable: false }
                );
            });
    }

}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        token: auth.token,
    };
}

export default connect(mapStateToProps)(TicketScannerScreen);

const styles = StyleSheet.create({
    infoPopupContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    infoPopup: {
        width: '90%',
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aaa',
        borderRadius: 10,
        opacity: 0.9,
    },
    infoPopupText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});