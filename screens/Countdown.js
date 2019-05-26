import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

class CountdownScreen extends React.Component {
    componentDidMount() {
        this.timerFunction = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerFunction);
    }

    updateCountdown() {
        this.forceUpdate();
    }

    // Generate countdown start time relative to event time
    getCountDownStartValue() {
        if (Date.parse(this.props.configuration.start_date) < Date.now()) {
            if (Date.now() < Date.parse(this.props.configuration.end_date)) {   // Event happening
                return Date.parse(this.props.configuration.end_date) - Date.now();  // get difference in milliseconds
            } else {  // Event over
                clearInterval(this.timerFunction);
                return 0;
            }
        } else {  // before event
            return Date.parse(this.props.configuration.start_date) - Date.now();
        }
    }

    // Generate Days:Hours:Minutes:Seconds timestamp from milliseconds
    generateDateTimestamp(milliseconds) {
        milliseconds = this.getCountDownStartValue();

        const seconds = ('0' + Math.floor((milliseconds / 1000) % 60)).slice(-2);
        const minutes = ('0' + Math.floor((milliseconds / 1000 / 60) % 60)).slice(-2);
        const hours = ('0' + Math.floor((milliseconds / (1000 * 60 * 60)) % 24)).slice(
            -2
        );
        const days = ('0' + Math.floor(milliseconds / (1000 * 60 * 60 * 24))).slice(
            -2
        );
        return [days, hours, minutes, seconds].join(':');
    }

    // Generate text greeting relative to event time
    generateGreeting() {
        if (Date.parse(this.props.configuration.start_date) < Date.now()) {
            if (Date.now() < Date.parse(this.props.configuration.end_date)) {   // Event happening
                return <Text>Hacking Time Remaining:</Text>
            } else {
                return <Text>Hacking Time is Over!</Text>
            }
        }
        return <Text>Mhacks Starts In:</Text>
    }

    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text>Welcome to {this.props.configuration !== null ? this.props.configuration.app_name : 'MHacks'}!</Text>
                {this.generateGreeting()}
                <Text>{this.generateDateTimestamp(this.getCountDownStartValue)}</Text>
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