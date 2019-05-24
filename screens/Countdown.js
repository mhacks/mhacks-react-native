import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import Button from '../components/Button';

class CountdownScreen extends React.Component {
    // Generate countdown start time relative to event time
    getCountDownStartValue() {
        if (Date.parse(this.props.configuration.start_date) < Date.now()) {
            if(Date.now() < Date.parse(this.props.configuration.end_date)){   // Event happening
                let t = Date.parse(this.props.configuration.end_date) - Date.now();  // get difference in milliseconds
                let seconds  = t / 1000;  // milliseconds to seconds
                return seconds;
            } else {  // Event over
                return 0;
            }

        } else {
            // Event starting in future
            let t = Date.parse(this.props.configuration.start_date) - Date.now();  // get difference in milliseconds
            let seconds  = t / 1000;  // milliseconds to seconds
            return seconds;
        }
    }
    
    // Generate text greeting relative to event time
    generateGreeting(){
        if (Date.parse(this.props.configuration.start_date) < Date.now()) {
            if(Date.now() < Date.parse(this.props.configuration.end_date)){   // Event happening
                return <Text>Hacking Time Remaining:</Text>
            } else {
                return <Text>Hacking Time is Over!</Text> 
            }
        }
        return <Text>Mhacks Starts in:</Text>
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
                <CountDown
                    until={this.getCountDownStartValue()}
                    size={20}
                />
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