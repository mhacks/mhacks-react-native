import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import TimerCountdown from "react-native-timer-countdown";
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import Button from '../components/Button';

class CountdownScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text>Welcome to {this.props.configuration.app_name}!</Text>
                <Text>Not a real countdown but:</Text>
                <TimerCountdown
                    initialMilliseconds={1000 * 60 * 60 * 24 * 3}
                    style={{ fontSize: 48 }}
                />
                {
                    // Temporary solution so we can quickly
                    // clear our app's storage
                    __DEV__ && (
                        <Button
                            isLoading={false}
                            title='Clear AsyncStorage'
                            onPress={() => AsyncStorage.clear()}
                        />
                    )
                }
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    const { configuration } = state;
    return {
        configuration: configuration.configuration,
    };
}

export default connect(mapStateToProps)(CountdownScreen);