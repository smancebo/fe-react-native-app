import React from 'react';
import {requireNativeComponent, View} from 'react-native';
import PropTypes from 'prop-types';


class ScrollList extends React.Component{
    render(){
        return (
            <View {...this.props}>
                <RCTScrollList {...this.props} >
                    {this.props.children}
                </RCTScrollList>
            </View>
        )
    }
}

ScrollList.propTypes = {
    direction: PropTypes.oneOf(['horizontal','vertical']).isRequired,
    moveValue: PropTypes.number.isRequired,
    movePosition: PropTypes.number.isRequired,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    offsetElement: PropTypes.number,
    ...View.propTypes
}

const RCTScrollList = requireNativeComponent('RCTScrollList', ScrollList);

export default ScrollList;