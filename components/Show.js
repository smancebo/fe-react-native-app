import React from 'react';
import { View, Image, Text, StyleSheet, Animated, Easing } from 'react-native';
import { config } from '../config';
import { Selectable } from './hoc/Selectable';

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.fadeValue = new Animated.Value(0);
        this.fadeIn = this.fadeIn.bind(this);
        this.fadeOut = this.fadeOut.bind(this);
        this.scaleValue = new Animated.Value(1);
        this.onLayout = this.onLayout.bind(this);
        this.SelectElement = (cb) => {
       
            Animated.timing(this.scaleValue, {
                toValue: 1.1,
                duration: 200
            }).start(() => {
                if (cb) cb();
            });
        }
        this.DeSelectElement = (cb) => {
           
            Animated.timing(this.scaleValue, {
                toValue: 1,
                duration: 200
            }).start(() => {
                if (cb) cb();
            })
        }
    }
    componentDidMount() {
        //this.fadeIn();
    }
    componentWillUnmount() {
        //this.fadeOut();
    }
    componentWillReceiveProps(newProps) {
        const { isFocus } = newProps;
        if (isFocus) {
            this.SelectElement()
        } else {
            this.DeSelectElement()
        }
    }

    fadeIn() {
        this.fadeValue.setValue(0);
        Animated.timing(this.fadeValue, {
            duration: 200,
            toValue: 1,
            easing: Easing.linear
        }).start();
    }

    fadeOut() {
        this.fadeValue.setValue(1);
        Animated.timing(this.fadeValue, {
            duration: 200,
            toValue: 0,
            easing: Easing.linear
        })
    }

    onLayout(e) {
        //console.log(e.native);
        this.props.onLayout(e);
    }


    render() {
        const { link, title, image, onLayout, isFocus, style } = this.props
        
        return (
            <Animated.View style={[style,{ transform: [{ scaleX: this.scaleValue }, { scaleY: this.scaleValue }] } ]}>
                <View style={styles.container} ref={(e) => this._self = e} onLayout={this.onLayout}>
                    <View style={styles.shadow}>
                        <Image style={styles.image} source={{ uri: `${config.API}/image/${image}` }} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Animated.View>
        )
    }
}

export default Selectable(Show)



const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        minWidth: 200,
        padding: 20,
        width:230
    },
    title: {
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