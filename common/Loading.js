import React from 'react';
import { Modal, ProgressBarAndroid, View, StyleSheet} from 'react-native';
import {baseOrangeColor} from './constants';

export default class Loading extends React.Component{
    render(){
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.onClose} hardwardAccelerated={true} animationType={'slide'} transparent={true} >
                <View style={styles.modalContainer}>
                    <View style={styles.innerContainer}>
                        <ProgressBarAndroid styleAttr='Inverse' color={baseOrangeColor} indeterminate={true}></ProgressBarAndroid>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        opacity: 0.9,
        backgroundColor: '#000000'
    },
    innerContainer: {
        alignItems: 'center'
    }
})