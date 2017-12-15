import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { config } from '../config';

export const Show = (props) => {
    const { link, title, image } = props

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `${config.API}/image/${image}`}} />
            <Text style={styles.title}>{title.length > 30 ? title.substring(0,30) : title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minWidth: 200,
        padding: 20
    },
    title : {
        fontSize: 24,
        color: 'white'
    },
    image: {
        width: 190,
        height: 230,
        minHeight: 230,
        minWidth: 190
    }

})