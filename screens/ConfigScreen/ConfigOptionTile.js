import React from 'react';
import { Tile } from '../../components/Navigation';
import { Text } from 'native-base'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ConfigOptionTile = (props) => {
    return (
        <Tile {...props} style={[styles.configTile]} onPress={props.onPress} >
            <View style={styles.configTileInnerView} >
                <Icon name={props.icon} style={[styles.configTileText, styles.configTileIcon]} />
                <Text style={styles.configTileText}>{props.text}</Text>
            </View>
        </Tile>
    )
}

export default ConfigOptionTile;

const styles = StyleSheet.create({
    configTileInnerView: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    configTile: { backgroundColor: '#222222', width: 180, height: 180 },
    configTileText: { color: 'white' },
    configTileIcon: { fontSize: 40 }
})