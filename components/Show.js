import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { config } from '../config';

export const Show = (props) => {
    const { link, title, image } = props

    return (
        <View style={styles.container}>
            <View style={styles.shadow}>
                <Image style={styles.image} source={{ uri: `${config.API}/image/${image}`}} />
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        minWidth: 200,
        padding: 20
    },
    title : {
        fontSize: 24,
        color: 'white',
        textAlign: 'center'
    },
    image: {
        width: 190,
        height: 230,
        borderRadius: 10
    },
    shadow: {
        elevation: 3,
        width: 190,
        height: 230,
        backgroundColor: '#222222',
        borderRadius: 10
    }


})