import React from 'react';
import {requireNativeComponent, View} from 'react-native'
import PropTypes from 'prop-types';

class FadeView extends React.Component{
    render(){
        return (
            <RCTFadeView {...this.props} >
                {this.props.children}
            </RCTFadeView>
        )
    }
}
const RCTFadeView = requireNativeComponent("RCTFadeView", FadeView);
FadeView.propTypes = {
    fade: PropTypes.oneOf(['in', 'out']),
    ...View.propTypes
}

export default FadeView