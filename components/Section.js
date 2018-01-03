import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { tileWidth, tileHeight, baseOrangeColor } from '../common/constants';
import { DPAD } from '../common/dpadKeyCodes';
import KeyEvent from 'react-native-keyevent';
import PropTypes from 'prop-types';

const scrollConstant = 142;
export default class Section extends React.Component {
    constructor(props) {
        super(props);
        this.ScrollValue = new Animated.Value(0);
        this.currentPosition = 0;
        this.scrollList = this.scrollList.bind(this);
    }
    styles = StyleSheet.create({
        title: {
            fontSize: 24,
            color: 'white'
        },
        main: {
            padding: 30,
            paddingBottom: 0,
            paddingTop: 10,

        },
        selector: {
            width: 135,
            height: 78,
            borderStyle: 'solid',
            borderColor: baseOrangeColor,
            borderWidth: 2,
            position: 'absolute',
            margin: 2.5,
    
        }
    })
    state = {
        tiles: []
    }

    componentDidMount() {
        const { focus } = this.props;

        if (focus) {
            KeyEvent.onKeyDownListener(({ keyCode }) => {
                switch (keyCode) {
                    case DPAD.DPAD_LEFT:
                        this.currentPosition += scrollConstant
                        this.scrollList();
                        break;

                    case DPAD.DPAD_RIGHT:
                        this.currentPosition -= scrollConstant;
                        this.scrollList()
                        break;
                }
            })
        }
    }

    registerTile(tile){
        let tiles = [...this.state.tiles];
        tiles.push(tile)

    }

    scrollList(cb) {
        Animated.timing(this.ScrollValue, {
            duration: 200,
            toValue: this.currentPosition
        }).start((done) => {
            cb && cb(done)
        })
    }

    getChildContext(){
        return {
            registerTile: this.registerTile
        }
    }

    render() {
        const { title, focus = false } = this.props
        const opacity = focus ? { opacity: 1 } : { opacity: .6 }
        return (
            <View style={[this.styles.main, opacity]}>
                <Text style={this.styles.title}>{title}</Text>
                <Animated.View style={ [{transform: [{translateX: this.ScrollValue}]}] } >
                    {/* <Animated.View style={ {left: (this.ScrollValue) * -1 } }>
                        <View style={[focus ? this.styles.selector : { display: 'none' }]}></View>
                    </Animated.View> */}
                    <View style={{ flexDirection: 'row', marginLeft: 2 }}>
                        {this.props.children}
                    </View>

                   
                </Animated.View>
            </View>
        )
    }
}

Section.childContextTypes = {
    registerTile: PropTypes.func
}