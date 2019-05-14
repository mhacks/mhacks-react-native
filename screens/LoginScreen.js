import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { fetchAuthFromEmailPassword } from '../actions/Auth';
import Input from '../components/Input';
import Button from '../components/Button';

class LoginScreen extends React.Component {

    state = {
        email: '',
        password: '',
    };

    render() {
        return (
            <View style={styles.formWrapper}>
                <View>
                    <Input
                        placeholder="Email"
                        type='email'
                        keyboardType='email-address'
                        onChangeText={this.onChangeText}
                        value={this.state.username}
                    />
                    <Input
                        placeholder="Password"
                        type='password'
                        onChangeText={this.onChangeText}
                        value={this.state.password}
                        secureTextEntry
                    />
                </View>

                <Button
                    isLoading={this.props.isAuthenticating}
                    title='Sign In'
                    onPress={this.signIn}
                />
            </View>
        )
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    formConstraintsFulfilled = () => {
        return this.state.email != '' && this.state.password != '';
    }

    signIn = () => {
        if (this.formConstraintsFulfilled()) {
            this.props.dispatch(fetchAuthFromEmailPassword(this.state.email, this.state.password))
                .catch(() => {
                    // Set password field to empty if auth fails
                    this.setState({ password: '' });
                });
        }
    }

}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        isAuthenticating: auth.isAuthenticating,
        isLoggedIn: auth.isLoggedIn,
    };
}

const styles = StyleSheet.create({
    formWrapper: {
        flex: 1,
        justifyContent: 'center',
        margin: 100,
    },
    textInput: {

    },
});

export default connect(mapStateToProps)(LoginScreen);