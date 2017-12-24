import React from 'react';
import Episode from './Episode';
import { View } from 'react-native'
import { DPAD_DOWN, DPAD_UP } from '../common/dpadKeyCodes';
import KeyEvents from 'react-native-keyevent'

const MOVE_VALUE = 90;
export default class EpisodeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentItem: 0
        }
        this.updateItems = this.updateItems.bind(this);
        this.focusItem = this.focusItem.bind(this);
        //this.translateValue = new Animated.Value(0);
        this.currentPosition = 0;
        this.currentItem = 0;
        // this.scrollList = (move, cb) => {
        //     Animated.timing(this.translateValue, {
        //         duration: 200,
        //         toValue: move
        //     }).start(() => {
        //         cb && cb();
        //     });
        // }
    }


    componentDidMount() {
        const { episodes } = this.props;
        this.setState({ items: episodes.slice(0, 6) });

        KeyEvents.removeKeyDownListener();
        KeyEvents.onKeyDownListener(({ keyCode }) => {
            switch (keyCode) {
                case DPAD_DOWN:
                    const { currentItem } = this.state;
                    const { episodes } = this.props;

                    if (currentItem < episodes.length - 1) {
                        this.currentPosition -= MOVE_VALUE;

                        //this.setState({ currentItem: this.currentItem });
                        // this.scrollList(this.currentPosition, () => {

                        // });

                        if (this.currentItem >= 2) {
                            this.updateItems(DPAD_DOWN);

                        } else {
                            this.currentItem += 1;
                        }
                        this.focusItem(this.currentItem, DPAD_DOWN);



                    }

                    break;
                case DPAD_UP:
                    if (this.currentPosition < 0) {
                        this.currentPosition += MOVE_VALUE;
                        
                        if (this.currentItem >= 2) {
                            this.updateItems(DPAD_UP);

                        } else {
                            this.currentItem -= 1;
                        }
                        this.focusItem(this.currentItem, DPAD_DOWN);

                    }

                    break;

            }
        });
    }
    focusItem(item, direction) {
        // let items = [...this.state.items];
        // if(direction === DPAD_DOWN) {
        //     items[this.currentItem - 1].isFocus = false;
        // } else if(direction === DPAD_UP){
        //     items[this.currentItem + 1].isFocus = false;
        // }
        // items[this.currentItem].isFocus = true;
        this.setState({ currentItem: this.currentItem });

    }

    updateItems(direction) {
        let items = [...this.state.items];
        const { currentItem } = this.state;
        const { episodes } = this.props;

        const itemIndex = episodes.indexOf(items[currentItem]);
        if (itemIndex !== -1) {
            if (direction === DPAD_DOWN) {
                items.shift();
                const item = episodes[itemIndex + 4];
                item && items.push(item);

            } else if (direction === DPAD_UP) {
                items.splice(items.length - 1, 1);
                const item = episodes[itemIndex - 4];
                item && items.unshift(item);
            }
        }


        // if (direction === DPAD_DOWN) {
        //     removedItems.unshift(items.shift());
        // } else if (direction === DPAD_UP) {
        //     items.unshift(removedItems.shift());
        // }
        this.setState({ items });

    }
    componentWillUnmount() {
        KeyEvents.removeKeyDownListener();
    }

    render() {
        const { items: episodes, currentItem } = this.state

        return (
            <View style={{ backgroundColor: '#000000', height: 9999, overflow: 'hidden' }} >
                {/* <Animated.View style={{ transform: [{ translateY: this.translateValue }], height: 99999, overflow: 'hidden' }}> */}
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {episodes.map((episode, i) => <Episode isFocus={currentItem === i ? true : false} key={i} {...episode} onPress={this.props.onEpisodeSelected} />)}
                </View>
                {/* </Animated.View> */}
            </View>
        )
    }
}