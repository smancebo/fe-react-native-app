import React from 'react';
import {requireNativeComponent, View} from 'react-native';
import PropTypes from 'prop-types';

class FocusableView extends React.Component
{
    render(){
        return (
           
            <View {...this.props}>
                <RCTFocusableView {...this.props}>
                    {this.props.children}
                </RCTFocusableView>
            </View>
            
        )
    }
}

FocusableView.propTypes = {
    focusView: PropTypes.bool,
    ...View.propTypes
}

const RCTFocusableView = requireNativeComponent("RCTFocusableView", FocusableView);

export default FocusableView;