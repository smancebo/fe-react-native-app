import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableNativeFeedback, TouchableHighlight, Image } from 'react-native';
import { tileWidth, tileHeight } from '../common/constants';
import PropTypes from 'prop-types';
import FocusableView from './native/FocusableView'
import { baseOrangeColor } from '../common/constants';

class Tile extends React.Component {
    constructor(props) {
        super(props);
       
        this._onPress = this._onPress.bind(this);
    }
    // shouldComponentUpdate(newProps, newState) {
    //     const { focus: isFocus = false } = this.props;
    //     const { focus: newFocus = false } = newProps;
    //     if (isFocus !== newFocus) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    _onPress(ev) {
        const { onPress = () => { } } = this.props;
        setTimeout(() => {
            onPress(ev);
        }, 200)

    }

    render() {
        const { style = {}, focus = false, pivotX = 0, pivotY = 0 } = this.props;
        
        return (

            <FocusableView focusView={focus} style={{ margin: 5}} pivotX={pivotX} pivotY={pivotY}  >

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
    const {focus} = props;
    const selected = focus ? { backgroundColor: 'white' } : {} 
   
    return (
        <View style={styles.imageTileWrapper}>
            <Tile {...props} style={[styles.imageTile, selected]} >
                <View style={styles.imageTileImageWrapper}>
                    <Image source={{ uri: props.image }} style={styles.imageTileImage} />
                </View>
            </Tile>
            {props.children}
        </View>
    )
}

Tile.Show = (props) => {
    const { focus } = props;
    const selected = focus ? { backgroundColor: 'white' } : {}

    return (
        <View style={styles.showTileWrapper}>
            <Tile {...props} style={[styles.showTile, selected]} >
                <View style={styles.showTileImageWrapper}>
                    <Image source={{ uri: props.image }} style={styles.showTileImage} />
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
    wrapper: {},
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
    },
    imageTileWrapper: {
        flexWrap: 'wrap', width: 200, flexDirection: 'column', alignItems: 'center'
    },
    imageTile: {
        padding: 2, backgroundColor: '#222222', height: 120, width: 180, margin: 0
    },
    imageTileImageWrapper: { position: 'absolute', width: '100%', height: '100%' },
    imageTileImage: { width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 2 },
    showTileWrapper: {
        flexWrap: 'wrap', width: 210, flexDirection: 'column', alignItems: 'center'
    },
    showTile: {
        padding: 2, backgroundColor: '#222222', height: 230, width: 190, margin: 0
    },
    showTileImageWrapper: { position: 'absolute', width: '100%', height: '100%' },
    showTileImage: { width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 2 }
})



export default Tile;

