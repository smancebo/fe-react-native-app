import React from 'react';
import { View, StyleSheet, Image, Text, Modal } from 'react-native';
import { config } from '../../config';
import FadeView from './FadeView';


const VideoOverlay = (props) => {
    const { visible = false} = props;
    const fade = visible ? 'in' : 'out'; 
    return (
        // <Modal visible={props.visible} onRequestClose={() => {return false}} transparent={true} hardwardAccelerated={true} animationType={'slide'} >
        <FadeView fade={fade} style={{ width: '100%', height: '100%', zIndex: 1, position: 'absolute' }} >
                <View style={[styles.main]}>
                    <View style={styles.overlay}></View>
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row' }} >
                            <Image style={styles.image} source={{ uri: `${config.API}/image/${props.show.image}` }} />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{props.show.name}</Text>
                                <Text style={styles.episode}>{props.show.episode}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </FadeView>
        // </Modal>
    )
}

module.exports = VideoOverlay;

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1
        
    },
    textContainer: { 
        flexDirection: 'column', 
        paddingLeft: 20, 
        justifyContent: 'center' 
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: .8,
        backgroundColor: '#000000'
    },
    name: {
        fontSize: 30,
        color: 'white'
    },
    episode: {
        fontSize: 24,
        color: 'white'
    },
    image: {
        width: 190,
        height: 230,
        borderRadius: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 50
    }
})