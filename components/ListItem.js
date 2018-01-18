import React from 'react';
import {View, StyleSheet} from 'react-native'
import {Text} from 'native-base';

const ListItem = (props) => {
    const {focus} = props;
    const focusStyle = focus ? styles.menuItemFocus : {}
    return (
        <View style={[styles.menuItem, focusStyle]}>
            <Text style={styles.menuItemText}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        padding: 20
    },
    menuItemText: { color: 'white', fontSize: 20 },
    menuItemFocus: {
        backgroundColor: '#1d1d1d'
    }
})

export default ListItem
