import React from 'react';
import { requireNativeComponent, View } from 'react-native';
import PropTypes from 'prop-types';

var iface = {
    name: 'Video',
    propTypes: {
        source: PropTypes.string,
        autoplay: PropTypes.bool,
        ...View.propTypes
    }
}

export default requireNativeComponent("RCTVideoView", iface);