import React from 'react';
import { Alert, View, StyleSheet, Picker, TextInput, Text, ScrollView, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import Config from '../config/config';
import Endpoints from '../config/endpoints';
import Button from '../components/Button';


class CreateAnnouncementScreen extends React.Component {

    state = {
        isPostingAnnouncement: false,
    };

    render() {
        // Create a window of Config.ANNOUNCEMENT_TIME_WINDOW_PADDING hours 
        // on each side of hacking around which announcements can be created.
        const datePickerMinDate = new Date(this.props.hackingStartTime.getTime() - 1000 * 60 * 60 * Config.ANNOUNCEMENT_TIME_WINDOW_PADDING);
        const datePickerMaxDate = new Date(this.props.hackingEndTime.getTime() + 1000 * 60 * 60 * Config.ANNOUNCEMENT_TIME_WINDOW_PADDING);

        // Get the initial time for the date picker. If during the window
        // set it to now, if before the window set it to the start,
        // and if after the window set it to the end.
        const datePickerInitialDate = new Date(Math.min(Math.max(datePickerMinDate, Date.now()), datePickerMaxDate));

        return (
            <SafeAreaView style={styles.backgroundContainer}>
                <Formik
                    initialValues={{ title: '', body: '', category: 'logistics', broadcastTime: datePickerInitialDate }}
                    onSubmit={values => this.postAnnouncement(values)}
                    validationSchema={yup.object().shape({
                        title: yup
                            .string()
                            .required(),
                        body: yup
                            .string()
                            .required(),
                    })}
                >
                    {({ values, handleChange, setFieldValue, errors, setFieldTouched, touched, isValid, handleSubmit }) => (

                        <ScrollView>
                            <View style={styles.formContainer}>
                                <View style={styles.fieldsContainer}>
                                    <View style={styles.field}>
                                        <Text style={styles.fieldTitle}>Title</Text>
                                        <TextInput
                                            value={values.title}
                                            onChangeText={handleChange('title')}
                                            onBlur={() => setFieldTouched('title')}
                                            autoCapitalize='words'
                                            placeholder='Title'
                                            fontSize={20}
                                            style={styles.textInput}
                                        />
                                        {touched.title && errors.title &&
                                            <Text style={styles.fieldError}>{errors.title}</Text>
                                        }
                                    </View>
                                    <View style={styles.field}>
                                        <Text style={styles.fieldTitle}>Body</Text>
                                        <TextInput
                                            value={values.body}
                                            onChangeText={handleChange('body')}
                                            placeholder='Body'
                                            multiline={true}
                                            minHeight={60}
                                            maxHeight={60}
                                            fontSize={16}
                                            textAlignVertical='top'
                                            autoCapitalize='sentences'
                                            onBlur={() => setFieldTouched('body')}
                                            style={styles.textInput}
                                        />
                                        {touched.body && errors.body &&
                                            <Text style={styles.fieldError}>{errors.body}</Text>
                                        }
                                    </View>
                                    <View style={styles.field}>
                                        <Text style={styles.fieldTitle}>Category</Text>
                                        <Picker
                                            selectedValue={values.category}
                                            onValueChange={(itemValue, itemIndex) => setFieldValue('category', itemValue)}
                                        >
                                            <Picker.Item label="Events" color={Config.COLORS.ANNOUNCEMENT_BY_CATEGORY['event']} value="event" />
                                            <Picker.Item label="Food" color={Config.COLORS.ANNOUNCEMENT_BY_CATEGORY['food']} value="food" />
                                            <Picker.Item label="Logistics" color={Config.COLORS.ANNOUNCEMENT_BY_CATEGORY['logistics']} value="logistics" />
                                            <Picker.Item label="Emergency" color={Config.COLORS.ANNOUNCEMENT_BY_CATEGORY['emergency']} value="emergency" />
                                            <Picker.Item label="Sponsored" color={Config.COLORS.ANNOUNCEMENT_BY_CATEGORY['sponsored']} value="sponsored" />
                                        </Picker>
                                    </View>
                                    <View style={styles.field}>
                                        <Text style={styles.fieldTitle}>Broadcast Time</Text>
                                        <View style={{ padding: 5 }}>
                                            <DatePicker
                                                style={{ backgroundColor: '#fff' }}
                                                date={values.broadcastTime}
                                                mode='datetime'
                                                cancelBtnText='Cancel'
                                                confirmBtnText='Confirm'
                                                showIcon={false}
                                                minDate={datePickerMinDate}
                                                maxDate={datePickerMaxDate}
                                                androidMode='spinner'
                                                onDateChange={(dateStr, date) => setFieldValue('broadcastTime', date)}
                                                getDateStr={date => moment(date).format('MMM DD [at] h:mm a')}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.submitButton}>
                                    <Button
                                        title='Create Announcement'
                                        onPress={handleSubmit}
                                        isLoading={this.state.isPostingAnnouncement}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    )}
                </Formik>
            </SafeAreaView>
        );
    }

    postAnnouncement = (values) => {
        this.setState({ isPostingAnnouncement: true });

        console.log(JSON.stringify(values));

        fetch(Endpoints.ANNOUNCEMENTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.authToken,
            },
            body: JSON.stringify(values),
        }).then(response => {
            if (response.status !== 200) {
                throw new Error(response.status);
            }

            this.setState({ isPostingAnnouncement: false });

            Alert.alert('Success', 'Successfully created announcement! Approve the announcement in the web portal to fully post it.');
            this.props.navigation.navigate('Announcements');
        }).catch(error => {
            this.setState({ isPostingAnnouncement: false });

            Alert.alert('Error', 'Failed to post announcement: ' + error);
        })
    }

}

function mapStateToProps(state) {
    const { auth, configuration } = state;
    return {
        authToken: auth.token,
        hackingStartTime: new Date(configuration.configuration.start_date),
        hackingEndTime: new Date(configuration.configuration.end_date),
    };
}

export default withNavigation(connect(mapStateToProps)(CreateAnnouncementScreen));

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: '#f6f6fb',
        flex: 1,
    },
    formContainer: {
        flex: 1,
        marginTop: 25,
    },
    fieldsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    field: {
        marginBottom: 15,
    },
    fieldTitle: {
        color: '#808080',
        textTransform: 'uppercase',
        marginLeft: 5,
    },
    fieldError: {
        fontSize: 10,
        color: 'red',
        margin: 5,
    },
    textInput: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        padding: 5,
        marginTop: 10,
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
});