import React from 'react';
import Episode from './Episode';
import { View, Animated } from 'react-native'
import { DPAD_DOWN, DPAD_UP } from '../common/dpadKeyCodes';
import KeyEvents from 'react-native-key-event'

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
        this.translateValue = new Animated.Value(0);
        this.currentPosition = 0;
        this.currentItem = 0;
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
        this.setState({
            items: episodes
        }, () => {
            this.focusItem(0);
        })
        
        KeyEvents.onKeyDownListener(({ keyCode }) => {
            switch (keyCode) {
                case DPAD_DOWN:
                    const { items, currentItem } = this.state;
                   
                    if (currentItem  < items.length -1 ) {
                        this.currentPosition -= MOVE_VALUE;
                        this.currentItem += 1;
                        this.scrollList(this.currentPosition, () => {
                            this.focusItem(this.currentItem);
                        });
                        
                    }
                   
                    break;
                case DPAD_UP:
                    if (this.currentPosition < 0) {
                        this.currentPosition += MOVE_VALUE;
                        this.currentItem -= 1;
                        this.scrollList(this.currentPosition, () => {
                            this.focusItem(this.currentItem);
                        });
                        
                    }

                    break;

            }
        });
    }
    focusItem(item){
        let items = [...this.state.items];
        items.forEach(item => item.isFocus = false);
        items[this.currentItem].isFocus = true;
        this.setState({currentItem: this.currentItem});
    }

    updateItems(direction) {
        let items = [...this.state.items];
        let removedItems = [...this.state.removedItems];

        if (direction === DPAD_DOWN) {
            removedItems.unshift(items.shift());
        } else if (direction === DPAD_UP) {
            items.unshift(removedItems.shift());
        }
        this.setState({ items, removedItems });

    }
    componentWillUnmount() {
        KeyEvents.removeKeyDownListener();
    }

    render() {
        const { items: episodes } = this.state
        return (
            <View style={{ backgroundColor: '#000000', height: 9999, overflow: 'hidden' }} >
                <Animated.View style={{ transform: [{ translateY: this.translateValue }], height: 99999, overflow: 'hidden' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        {episodes.map((episode) => <Episode style={{ height: 100 }} key={episode.id} {...episode} onPress={this.props.onEpisodeSelected} />)}
                    </View>
                </Animated.View>
            </View>
        )
    }
}