import React from 'react';
import { MapView } from 'expo';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import Config from '../config/config';

class MapScreen extends React.Component {

    render() {
        if (!this.props.fetched) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>
            );
        }

        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: this.props.locations[0] ? parseFloat(this.props.locations[0].latitude) : 0,
                    longitude: this.props.locations[0] ? parseFloat(this.props.locations[0].longitude) : 0,
                    latitudeDelta: Config.MAP_DELTA,
                    longitudeDelta: Config.MAP_DELTA,
                }}
            />
        );
    }

}

function mapStateToProps(state) {
    const { locations } = state;
    return {
        locations: locations.locations,
        fetched: locations.fetched,
    };
}

export default connect(mapStateToProps)(MapScreen);