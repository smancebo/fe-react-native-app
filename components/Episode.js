import React from 'react';
import { Selectable } from './hoc/Selectable';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { baseOrangeColor } from '../common/constants'
import { Icon } from 'native-base';


export default class Episode extends React.Component {
    constructor(props) {
        super(props)
       
      

        this.styles = StyleSheet.create({

            active: {
                elevation: 3,
                backgroundColor: baseOrangeColor,
            },
            episode: {
                width: 130,
                minHeight: 30,
                backgroundColor: '#3d3e3f',
                padding: 2,
                borderRadius: 5,
                margin: 1,
                marginBottom: 0
            },
            episodeName: {
                fontSize: 24,
                color: 'white',
                textAlign: 'left'
            }
        })
    }
    render() {
        const { name, link, isFocus = false } = this.props
        return (
            <View style={[{ height: 80, backgroundColor: '#222222', margin: 10, flexDirection: 'row', marginBottom: 0, borderRadius: 10}, isFocus ? {backgroundColor: baseOrangeColor} : {}]}>
                <View style={{ flex: 20 }}>
                    <View style={{ backgroundColor: '#000000', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', margin: 5, borderRadius: 10 }}>
                        <Icon style={{width: 32, height: 32, color: 'white', textAlign: 'center'}} name='md-play' color='white' />
                    </View>
                </View>
                <View style={{ flex: 80 }}>
                    <Text style={this.styles.episodeName}>{name}</Text>
                </View>
            </View>
        )
    }
}



