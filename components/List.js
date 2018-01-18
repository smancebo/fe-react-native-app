import React from 'react';
import { View } from 'react-native';
import KeyEvents from 'react-native-keyevent'
import ListItem from './ListItem';
import { DPAD } from '../common/dpadKeyCodes';
import ScrollList from './native/ScrollList';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.move = this.move.bind(this);
        this._onItemSeleced = this._onItemSeleced.bind(this);
        this.selectItem = this.selectItem.bind(this);

        this.state = {
            focusItem: 0,
            selectedItem: ''
        }
        
    }

    componentDidMount() {
        this.previousKeyDown = KeyEvents.listenerKeyDown;
        KeyEvents.onKeyDownListener(({ keyCode }) => {
            switch (keyCode) {
                case DPAD.DPAD_DOWN:
                    this.move(DPAD.DPAD_DOWN);
                    break;
                case DPAD.DPAD_UP:
                    this.move(DPAD.DPAD_UP);
                    break;

                case DPAD.DPAD_CENTER:
                    this.selectItem();
                    break;
            }
        })
    }

    move(direction){
        const children = React.Children.toArray(this.refs.list.props.children);
        let {focusItem} = this.state;
       

        switch (direction){
            case DPAD.DPAD_DOWN:
                if(focusItem < children.length - 1){
                    focusItem++
                }
                break;

            case DPAD.DPAD_UP:
                if(focusItem > 0){
                    focusItem--
                }
                break;
        }

        this.setState({focusItem});
    }

    componentWillUnmount() {
        KeyEvents.removeKeyDownListener();
        this.previousKeyDown && KeyEvents.onKeyDownListener(this.previousKeyDown.listener)
    }

    _onItemSeleced(item) {
        this.props.onItemSelected && this.props.onItemSelected(item);
    }

    selectItem(){
        const children = React.Children.toArray(this.refs.list.props.children);
        const {focusItem} = this.state;
        const { onPress = () => { } } = children[focusItem].props;

        onPress();
    }

    render() {
        const { items } = this.props;
        const { focusItem, selectedItem } = this.state;
        return (

            <ScrollList direction='vertical' ref="list" moveValue={100} movePosition={focusItem} style={{ flexDirection: 'column', flex: 1, justifyContent: 'center' }} >
                {items.map((item, i) => <ListItem onPress={() => this._onItemSeleced(item)} text={item} key={item} focus={focusItem === i ? true : false} selected={selectedItem === item ? true : false} />)}
            </ScrollList>

        )
    }
}