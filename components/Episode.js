import React from 'react';
import {Selectable} from './hoc/Selectable';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { baseOrangeColor  } from '../common/constants'


export const Episode = Selectable(class extends React.Component{
    constructor(props){
        super(props)
        this.scaleValue = new Animated.Value(1);
        this.scaleUp = Animated.timing(this.scaleValue, {
            toValue: 1.1,
            duration: 200
        });
        this.scaleDown = Animated.timing(this.scaleValue, {
            toValue: 1,
            duration: 200
        });
    }

    render(){
        const {name, link} = this.props
        return (
            <View style={this.styles.episode}>
                <Text>{name}</Text>
            </View>
        )
    }

    styles = StyleSheet.create({
        active: {
            elevation: 3,
            backgroundColor: baseOrangeColor,
            transform: [
                { scaleX: this.scaleValue },
                { scaleY: this.scaleValue }
            ],
        },
        episode: {
            width: 210,
            minHeight: 50,
            backgroundColor: '#3d3e3f',
            padding: 2,
            borderRadius: 5
        }
    })
})

