import React from 'react';
import Episode from './Episode';
import EpisodesGroup from './EpisodesGroup';
import { View, Animated, BackHandler } from 'react-native'
import { DPAD_DOWN, DPAD_UP, DPAD_FAST_FORWARD, DPAD_FAST_BACKWARD, DPAD_CENTER } from '../common/dpadKeyCodes';
import KeyEvents from 'react-native-keyevent'
import Browser from './Browser';
import Section from './Section';
import ScrollList from './native/ScrollList';
import FadeView from './native/FadeView';

const EPISODE_GROUP = 50;
const MOVE_VALUE = 180;

const group = (arr, pageSize, page, grouped) => {
    let elements = [...arr];
    grouped = grouped || [];
    page = page || 0;

    if(elements.length === 0) {
        return grouped.map((item, i) => {
            const reduced = grouped.slice(0, i + 1).map((elm) => elm.length).reduce((a, b) => a + b, 0);
            return {
                category: `Episodes ${(i * pageSize) + 1} to ${reduced}`,
                episodes: item
            }
        })
    }
    const sliced = elements.slice(0, pageSize);
    grouped.push(sliced)
    elements.splice(0, sliced.length);
    return group(elements, pageSize, page + 1, grouped)
}

export default class EpisodeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            episodesGroups: [],
            currentItem: 0,
            episodes: [],
            groups: true,
            fade: 'in'
        }
        this.updateItems = this.updateItems.bind(this);
        this.focusItem = this.focusItem.bind(this);
        this.translateValue = new Animated.Value(0);
        this.currentPosition = 0;
        this.currentItem = 0;
        this.timeOutInterval = 0;
        this.selectEpisode = this.selectEpisode.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.onPressElement = this.onPressElement.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.blink = this.blink.bind(this);
       
        this.moveDown = () => {
            const { currentItem, groups, episodesGroups, episodes } = this.state;
            const children = (groups ? episodesGroups.length : episodes.length) - 1;

            if (currentItem < children) {

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
        
        if (this.props.episodes > EPISODE_GROUP){
            this.setState({ episodesGroups: group(this.props.episodes.sort((a, b) => b.id - a.id), EPISODE_GROUP) });
            this.handler = BackHandler.addEventListener("hardwareBackPress", this.handleBack)
        } else {
            this.setState({group: false, episodes: this.props.episodes})
        }
        
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
                    this.onPressElement();
                break;

            }
        });
    }
    focusItem(item, direction) {
        this.setState({ currentItem: this.currentItem });
    }

    handleBack(){
        const { groups } = this.state;

        if (!groups) {
            this.blink(() => {
                this.currentItem = 0;
                this.setState({ groups: true, currentItem: this.currentItem })
            })

            return true;
        } else {
            return false;
        }
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
        BackHandler.removeEventListener();
    }

    onPressElement(){
        const childrens = React.Children.toArray(this.refs.scrollList.props.children);
        const selectedElement = childrens[this.currentItem];
        const {onPress = () => {}} = selectedElement.props;
        
        onPress();
    }

    selectEpisode(episode){
        // const { episodes } = this.props;
        // const { currentItem } = this.state;
        // const index = item || currentItem;
        this.handler.remove();
        this.props.onEpisodeSelected(episode, this.handleBack.bind(this));
    }
    selectCategory(category){
        this.blink(() => {
            this.currentItem = 0;
            this.setState({ groups: false, episodes: category.episodes, currentItem: this.currentItem })
        })
    }   

    blink(cb){
        this.setState({fade: 'out'}, () => {
            setTimeout(()=> {
                this.setState({fade: 'in'}, cb)
            }, 100)
        })
    }

    render() {
        const { currentItem, episodesGroups, groups, episodes, fade } = this.state
        // const { episodes } = this.props
        let childs = [];
        if(groups){
            childs = episodesGroups.map((item, i) => <EpisodesGroup onPress={() => this.selectCategory(item)} name={item.category} isFocus={currentItem === i ? true : false} key={i} />)
        } else {
            childs = episodes.map((episode, i) => <Episode onPress={() => this.selectEpisode(episode)} isFocus={currentItem === i ? true : false} key={i} {...episode} />)
        }
        return (
           
            <FadeView fade={fade}>
                <ScrollList ref="scrollList" direction='vertical' movePosition={currentItem} moveValue={MOVE_VALUE} offsetElement={2} style={{flexDirection:'column', backgroundColor: '#000000', height: 99999, overflow: 'hidden', paddingTop: (MOVE_VALUE * -1) }}>
                    {childs}
                </ScrollList>
            </FadeView>
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