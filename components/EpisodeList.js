import React from 'react';
import Episode from './Episode';
import { View, Animated } from 'react-native'
import { DPAD_DOWN, DPAD_UP, DPAD_FAST_FORWARD, DPAD_FAST_BACKWARD, DPAD_CENTER } from '../common/dpadKeyCodes';
import KeyEvents from 'react-native-keyevent'
import Browser from './Browser';
import Section from './Section';
import ScrollList from './native/ScrollList';

const MOVE_VALUE = 180;
export default class EpisodeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentItem: 0
        }
        this.updateItems = this.updateItems.bind(this);
        this.focusItem = this.focusItem.bind(this);
        this.translateValue = new Animated.Value(0);
        this.currentPosition = 0;
        this.currentItem = 0;
        this.timeOutInterval = 0;
        this.selectEpisode = this.selectEpisode.bind(this);
       
        this.moveDown = () => {
            const { currentItem } = this.state;
            const { episodes } = this.props;
            if (currentItem < episodes.length - 1) {

                this.currentItem += 1;
                //this.setState({ currentItem: this.currentItem });
                this.focusItem(this.currentItem, DPAD_DOWN);
                if (this.currentItem > 2) {
                    this.currentPosition -= MOVE_VALUE;
                    this.timeOutInterval = setTimeout(() => {
                        this.scrollList(this.currentPosition);
                    }, 100)
                }
            }
        }
        this.moveUp = () => {
            if (this.currentItem > 2) {
                this.currentPosition += MOVE_VALUE;
                this.currentItem -= 1;
                this.focusItem(this.currentItem, DPAD_UP);
                this.timeOutInterval = setTimeout(() => {
                    this.scrollList(this.currentPosition, );
                }, 100)

            } else {
                if (this.currentItem > 0) {
                    this.currentItem -= 1;
                    this.focusItem(this.currentItem, DPAD_UP);
                }
            }

        }
        this.scrollList = (move, cb) => {
            Animated.timing(this.translateValue, {
                duration: 200,
                toValue: move
            }).start(() => {
                cb && cb();
            });
        }
    }


    componentDidMount() {
        const { episodes } = this.props;
        this.setState({ items: episodes.slice(0, 6) });
        this.previousKeyDown = KeyEvents.listenerKeyDown;

        KeyEvents.removeKeyDownListener();
        KeyEvents.onKeyDownListener(({ keyCode }) => {
            const { currentItem } = this.state;
            const { episodes } = this.props;

            clearTimeout(this.timeOutInterval);
            switch (keyCode) {
                case DPAD_FAST_FORWARD:
                    for (let i = 0; i <= 10; i++) {
                        this.moveDown();
                    }
                    break;
                case DPAD_FAST_BACKWARD:
                    for (let i = 0; i <= 10; i++) {
                        this.moveUp();
                    }
                    break;

                case 0:
                    for (let i = 0; i <= 10; i++) {
                        this.moveDown();
                    }
                break;
                case DPAD_DOWN:
                    this.moveDown();
                    break;
                case DPAD_UP:
                    this.moveUp();
                    break;

                case DPAD_CENTER: 
                    this.selectEpisode();
                break;

            }
        });
    }
    focusItem(item, direction) {
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
                const item = episodes[itemIndex - 4];
                if (item !== undefined) {
                    items.splice(items.length - 1, 1);
                    item && items.unshift(item);
                } else {
                    this.currentItem -= 1;
                }

            }
        }

        this.setState({ items });

    }
    componentWillUnmount() {
        KeyEvents.removeKeyDownListener();
        KeyEvents.onKeyDownListener(this.previousKeyDown.listener);
    }
    selectEpisode(item){
        const { episodes } = this.props;
        const { currentItem } = this.state;
        const index = item || currentItem;

        this.props.onEpisodeSelected(episodes[index]);
    }   

    render() {
        const { currentItem } = this.state
        const { episodes } = this.props
        return (
           
            <ScrollList direction='vertical' movePosition={currentItem} moveValue={MOVE_VALUE} offsetElement={2} style={{flexDirection:'column', backgroundColor: '#000000', height: 99999, overflow: 'hidden', paddingTop: (MOVE_VALUE * -1) }}>
                {episodes.map((episode, i) => <Episode onPress={() => this.selectEpisode(currentItem)} isFocus={currentItem === i ? true : false} key={i} {...episode} />)}
            </ScrollList>
            // <View style={{ backgroundColor: '#000000', height: 9999, overflow: 'hidden', paddingTop: (MOVE_VALUE * -1) }} >
            //     <Animated.View style={{ transform: [{ translateY: this.translateValue }], height: 99999, overflow: 'hidden' }}>
            //         <View style={{ flex: 1, flexDirection: 'column' }}>
            //             {episodes.map((episode, i) => <Episode onPress={() => this.selectEpisode(currentItem)} isFocus={currentItem === i ? true : false} key={i} {...episode}  />)}
            //         </View>
            //     </Animated.View>
            // </View>
        )
    }
}