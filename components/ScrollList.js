import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

class ScrollList extends React.Component{


    constructor(props){
        super(props);
        this.scrollValue = new Animated.Value(0);
        this.scrollList = this.scrollList.bind(this);
    }

    componentDidMount(){
        const { position, moveValue = 0 } = this.props;
        this.moveValue =  moveValue;
        this.scrollList(position);
    }

    // shouldComponentUpdate(newProps, newState){
    //     const newPosition = newProps.position;
    //     const oldPosition = this.props.position;

    //     if(newPosition !== oldPosition){
    //         return true;
    //     }else {
    //         return false;
    //     }
    // }

    scrollList(position){
        
        const children = React.Children.toArray(this.props.children);

        if(position > (children.length - 1) || position < 0 || position === undefined){
            return ;
        }
        const currentPosition = (position * this.moveValue) * -1;

        Animated.timing(this.scrollValue, {
            duration: 200,
            toValue: currentPosition
        }).start()
    }

    componentWillReceiveProps(newProps){
        const { position } = newProps;
        this.scrollList(position);
    }

    render(){
        const {direction} = this.props;
        let moveStyle = {};
        switch(direction){
            case HORIZONTAL:
                moveStyle = {transform: [{translateX: this.scrollValue}]};
            break;
            case VERTICAL:
                moveStyle = {transform: [{translateY: this.scrollValue}]};
            break;
        };

       return (
           <View renderToHardwareTextureAndroid={true} >
               <Animated.View style={[moveStyle, this.props.style]} >
                   {this.props.children}
               </Animated.View>
           </View>
       )

    }
}

ScrollList.propTypes = {
    direction: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
    position: PropTypes.number
}

export default ScrollList