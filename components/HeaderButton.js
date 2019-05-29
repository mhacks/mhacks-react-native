import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { getPlatformSpecificIconName } from '../utils/Icons';

class HeaderButton extends React.Component {

    render() {
        if (!this.props.render) {
            return null;
        }

        return (
            <TouchableOpacity onPress={this._onPress}>
                <Ionicons
                    name={getPlatformSpecificIconName(this.props.iconName)}
                    style={{ padding: 10 }}
                    size={20}
                />
            </TouchableOpacity>
        );
    }

    _onPress = () => {
        if (this.props.action !== undefined) {
            this.props.dispatch(this.props.action())
        }

        if (this.props.navigateTo !== undefined) {
            this.props.navigation.navigate(this.props.navigateTo, this.props.navigationParams);
        }
    }

}

HeaderButton.propTypes = {

    // Generic name of the icon to display.
    // Will be converted to platform-specific icon
    iconName: PropTypes.string.isRequired,

    // Optional redux action to perform when
    // clicking on header button.
    action: PropTypes.func,

    // Optional navigation target to navigate to
    // when clicking on header button.
    navigateTo: PropTypes.string,

    // Optional parameters to pass when navigating.
    navigationParams: PropTypes.object,

    // A function taking in a state and returning
    // a bool determining whether the header
    // button should render.
    shouldRender: PropTypes.func.isRequired,

};

function mapStateToProps(state, ownProps) {
    return {
        render: ownProps.shouldRender(state),
    };
}

export default withNavigation(connect(mapStateToProps)(HeaderButton));