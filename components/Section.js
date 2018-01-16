import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { tileWidth, tileHeight, baseOrangeColor } from '../common/constants';
import { DPAD } from '../common/dpadKeyCodes';
import KeyEvent from 'react-native-keyevent';
import PropTypes from 'prop-types';
import ScrollList from './native/ScrollList';

const scrollConstant = 140;
export default class Section extends React.PureComponent {
    constructor(props) {
        super(props);
        this.ScrollValue = new Animated.Value(0);
        this.currentPosition = 0;
        this.currentItem = 0;
        this.scrollList = this.scrollList.bind(this);
        this.selectElement = this.selectElement.bind(this);
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
            flexDirection: 'column'

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
        currentItem: 0
    }

    componentDidMount() {
        const { focus, selectedElement } = this.props;
        //this.selectElement(selectedElement);
        // if (focus) {
        //     KeyEvent.onKeyDownListener(({ keyCode }) => {
        //         const children = React.Children.toArray(this.props.children);
        //         const {currentItem} = this.state;

        //         switch (keyCode) {
        //             case DPAD.DPAD_LEFT:
        //                 if (this.currentItem > 0) {
        //                     this.scrollList(DPAD.DPAD_LEFT);
        //                 }

        //                 break;

        //             case DPAD.DPAD_RIGHT:
        //                 if (this.currentItem < children.length - 1) {
        //                     this.scrollList(DPAD.DPAD_RIGHT);
        //                 }

        //                 break;

        //             case DPAD.DPAD_CENTER:
        //                 const {onPress = () => {}} = children[currentItem].props;
        //                 onPress();
        //                 return;
        //             break;
        //         }

        //         this.setState({ currentItem: this.currentItem })
        //     })
        // }
    }

    componentWillReceiveProps(newProps) {
        const { selectedElement } = newProps;
       this.setState({currentItem: selectedElement})
       this.forceUpdate()
    }

    registerTile(tile) {
        let tiles = [...this.state.tiles];
        tiles.push(tile)

    }
    selectElement(elementIndex) {
        const { currentItem } = this.state;
        const { focus } = this.props;
        const children = React.Children.toArray(this.props.children);

        elementIndex = elementIndex || 0;
        elementIndex = elementIndex < 0 ? 0 : elementIndex;
        elementIndex = elementIndex > (children.length - 1) ? (children.length - 1) : elementIndex;

        if (focus) {
            this.currentPosition = (scrollConstant * elementIndex) * -1;
            this.currentItem = elementIndex;

            Animated.timing(this.ScrollValue, {
                duration: 200,
                toValue: this.currentPosition
            }).start((done) => {

            })
            this.setState({ currentItem: this.currentItem });

            this.props.onSelectedElement && this.props.onSelectedElement(this.currentItem);

        }
    }
    scrollList(direction, cb) {

        if (direction === DPAD.DPAD_LEFT) {
            this.currentPosition += scrollConstant
            this.currentItem -= 1;

        } else if (direction === DPAD.DPAD_RIGHT) {
            this.currentPosition -= scrollConstant;
            this.currentItem += 1;
        }
        Animated.timing(this.ScrollValue, {
            duration: 200,
            toValue: this.currentPosition
        }).start((done) => {
            cb && cb(done)
        })
    }

    getChildContext() {
        return {
            registerTile: this.registerTile
        }
    }

    render() {
        const { title, focus = false, children, scrollValue = scrollConstant, offsetElement = 0 } = this.props
        const { currentItem } = this.state;
        const opacity = focus ? { opacity: 1 } : { opacity: .6 }
        return (
            <View style={[this.styles.main, opacity]}>
                <Text style={this.styles.title}>{title}</Text>
                {/* <Animated.View style={[{ transform: [{ translateX: this.ScrollValue }] }, { width: 99999 }]}> */}
                {/* <Animated.View style={ {left: (this.ScrollValue) * -1 } }>
                        <View style={[focus ? this.styles.selector : { display: 'none' }]}></View>
                    </Animated.View> */}


                <ScrollList direction='horizontal' offsetElement={offsetElement} offsetX={60} moveValue={scrollValue} movePosition={currentItem} style={{ flexDirection: 'row', paddingLeft: 0, padding: 5}} >
                    {React.Children.map(children, (child, i) => <child.type key={i} {...child.props} focus={(i === currentItem) && focus ? true : false} />)}
                </ScrollList>





                {/* </Animated.View> */}
            </View>
        )
    }
}

Section.childContextTypes = {
    registerTile: PropTypes.func
}