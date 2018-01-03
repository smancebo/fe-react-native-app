import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {tileWidth, tileHeight} from '../common/constants';
import PropTypes from 'prop-types';


const Tile = (props) => {
    const {style = {}, focus = false} = props;
    const scale = {transform: [{scaleX:1.1},{scaleY: 1.1}]}
    return (
        <View style={styles.wrapper} >
            <View style={[styles.tile, style, focus ? scale : {}]} >
                {props.children}
            </View>
        </View>
    )
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

