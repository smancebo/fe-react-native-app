import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import { tileWidth, tileHeight } from '../common/constants';
import PropTypes from 'prop-types';



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
        this.evaluateFocus(focus);
    }
    componentWillReceiveProps(newProps) {
        const { focus = false } = newProps;
        this.evaluateFocus(focus);

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
        },200)
        
    }

    render() {
        const { style = {}, focus = false } = this.props;
        const focusStyle = { transform: [{ scaleX: this.scaleValue }, { scaleY: this.scaleValue }], opacity: this.opacityValue }
        return (

            <View style={styles.wrapper} >
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('white', false)} onPress={this._onPress} style={{ padding: 20, width: tileWidth, height: tileHeight }} >
                    <Animated.View style={[styles.tile, style, focusStyle]} renderToHardwareTextureAndroid={true}  >

                        {this.props.children}

                    </Animated.View>
                </TouchableNativeFeedback>
            </View>


        )
    }
}

Tile.Image = (props) => {
    return (
        <View style={styles.wrapper}>
            <View style={[styles.tile, style]} >
                {props.children}
            </View>
        </View>
    )
}

Tile.contextTypes = {
    registerTile: PropTypes.func
}

const styles = StyleSheet.create({
    wrapper: { padding: 5 },
    tile: {
        borderRadius: 2,
        width: tileWidth,
        height: tileHeight,
        padding: 10,
        backgroundColor: '#222',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    }
})



export default Tile;

