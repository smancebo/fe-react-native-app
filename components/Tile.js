import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableNativeFeedback, TouchableHighlight, Image } from 'react-native';
import { tileWidth, tileHeight } from '../common/constants';
import PropTypes from 'prop-types';
import FocusableView from './native/FocusableView'
import { baseOrangeColor } from '../common/constants';





class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.focusElement = this.focusElement.bind(this);
        this.scaleValue = new Animated.Value(1);
        this.opacityValue = new Animated.Value(0.8);
        this._onPress = this._onPress.bind(this);
    }
    shouldComponentUpdate(newProps, newState) {
        const { focus: isFocus = false } = this.props;
        const { focus: newFocus = false } = newProps;
        if (isFocus !== newFocus) {
            return true;
        } else {
            return false;
        }
    }

    focusElement(cb) {
        Animated.parallel([
            Animated.timing(this.scaleValue, {
                duration: 200,
                toValue: 1.1
            }),
            Animated.spring(this.opacityValue, {
                duration: 200,
                toValue: 1
            })
        ]).start(done => cb && cb(done));
    }

    blurElement(cb) {
        Animated.parallel([
            Animated.timing(this.scaleValue, {
                duration: 200,
                toValue: 1
            }),
            Animated.spring(this.opacityValue, {
                duration: 200,
                toValue: .8
            })
        ]).start(done => cb && cb(done));
    }

    componentDidMount() {
        const { focus = false } = this.props;
        //this.evaluateFocus(focus);
    }
    componentWillReceiveProps(newProps) {
        const { focus = false } = newProps;
        //this.evaluateFocus(focus);

    }

    evaluateFocus(focus) {
        if (focus) {
            this.focusElement()
        } else {
            this.blurElement()
        }
    }

    _onPress(ev) {
        const { onPress = () => { } } = this.props;
        setTimeout(() => {
            onPress(ev);
        }, 200)

    }

    render() {
        const { style = {}, focus = false } = this.props;
        const focusStyle = { transform: [{ scaleX: this.scaleValue }, { scaleY: this.scaleValue }], opacity: this.opacityValue }
        return (

            <FocusableView focusView={focus} style={{margin: 5}}  >

                <View style={styles.wrapper} >
                    <View style={[styles.tile, style,]}  >

                        {this.props.children}

                    </View>
                </View>


            </FocusableView>


        )
    }
}




Tile.Image = (props) => {
    return (
        <View style={{ flexWrap: 'wrap', width: 200, flexDirection: 'column' , alignItems: 'center'  }}>
            <Tile {...props} style={{ padding: 2, backgroundColor: '#222222', height: 120, width: 180, margin: 0 }}>
                <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <Image source={{ uri: props.image }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 2 }} />
                </View>
            </Tile>
            {props.children}
        </View>
    )
}

Tile.contextTypes = {
    registerTile: PropTypes.func
}

const styles = StyleSheet.create({
    wrapper: { },
    tile: {
        borderRadius: 2,
        width: tileWidth,
        height: tileHeight,
        padding: 10,
        backgroundColor: '#222',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    }
})



export default Tile;

