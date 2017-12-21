import React from 'react';
import { Selectable } from './hoc/Selectable';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { baseOrangeColor } from '../common/constants'


export const Episode = Selectable(class Episode extends React.Component {
    constructor(props) {
        super(props)
        this.scaleValue = new Animated.Value(1);
        this.onLayout = this.onLayout.bind(this);
        this.scaleUp = () => {
            Animated.timing(this.scaleValue, {
                toValue: 1.1,
                duration: 200
            }).start();
        }
        this.scaleDown = () => {
            Animated.timing(this.scaleValue, {
                toValue: 1,
                duration: 200
            }).start();
        }
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
                margin: 5
            },
            episodeName: {
                fontSize: 24,
                color: 'white',
                textAlign: 'center'
            }
        })
    }

    componentWillReceiveProps(newProps) {
        const { isFocus } = newProps;

        if(isFocus){
            //this.scaleUp()
        }else {
            //this.scaleDown()
        }
    }
    onLayout(e){
        const { layout } = e.nativeEvent;
        // this._self = {
        //     measure: (cb) => {
        //         cb(layout.x, layout.y, layout.width, layout.height, layout.x, layout.y)
        //     }
        // }
        this.props.onLayout(e);
    }

    render() {
        const { name, link, isFocus = false } = this.props
        return (
            <Animated.View style={[this.styles.episode, { transform: [{ scaleX: this.scaleValue }, { scaleY: this.scaleValue }] }, isFocus === true ? this.styles.active : {}]}>
                <View ref={(x)=>{this._self = x}} onLayout={this.onLayout}>
                    <Text style={this.styles.episodeName}>{name}</Text>
                </View>
            </Animated.View>
        )
    }


})



