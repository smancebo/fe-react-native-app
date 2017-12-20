import React from 'react';
import {
    DPAD_CENTER,
    DPAD_DOWN,
    DPAD_LEFT,
    DPAD_UP,
    DPAD_RIGHT,
    DPAD_FAST_BACKWARD,
    DPAD_FAST_FORWARD
} from '../../common/dpadKeyCodes';
import KeyEvent from 'react-native-key-event';
import PropTypes from 'prop-types'
import {
    View
} from 'react-native';


export default class SelectableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.registerSelectable = this.registerSelectable.bind(this);
        this.selectFirstElement = this.selectFirstElement.bind(this);
        this.selectComponent = this.selectComponent.bind(this);
        this.clearSelectables = this.clearSelectables.bind(this);
        this.unRegisterSelectable = this.unRegisterSelectable.bind(this);
        this.clickItem = this.clickItem.bind(this);
        this.state = {
            activeSelectable: null,
            selectables: []
        }
    }

    componentDidMount() {
        const {
            onFastForward,
            onFastBackward
        } = this.props;
        KeyEvent.onKeyDownListener((event) => {
            switch (event.keyCode) {
                case DPAD_LEFT:
                    this.selectComponent(x => x - 1, DPAD_LEFT);
                    break;
                case DPAD_RIGHT:
                    this.selectComponent(x => x + 1, DPAD_RIGHT);
                    break;

                case DPAD_UP:
                    this.selectComponent(x => x - 1, DPAD_UP);
                    break;

                case DPAD_DOWN:
                    this.selectComponent(x => x + 1, DPAD_DOWN);
                    break;

                case DPAD_FAST_FORWARD:
                    onFastForward && onFastForward();
                    break;
                case DPAD_FAST_BACKWARD:
                    onFastBackward && onFastBackward();
                    break;

                case DPAD_CENTER:
                    this.clickItem();
                    break;
            }
        })
    }

    componentWillUnmount() {
        KeyEvent.removeKeyDownListener();
    }

    render() {
        return this.props.children
    }

    clickItem(){
        const {activeSelectable} = this.state;
        activeSelectable && activeSelectable.onPress();
    }

    selectComponent(indexMod, direction) {
        let sortedSelectables = [];
        let newSelected = {};
        const {
            selectables,
            activeSelectable
        } = this.state;

        if (activeSelectable) {
            if ((direction === DPAD_LEFT) || (direction === DPAD_RIGHT)) {
                sortedSelectables = selectables.sort((a, b) => a.x - b.x).filter((item) => item.y === activeSelectable.y);
            } else if ((direction === DPAD_DOWN) || (direction === DPAD_UP)) {
                sortedSelectables = selectables.sort((a, b) => a.y - b.y).filter((item) => item.y !== activeSelectable.y); //sort and remove with same 'y'
            }
            const activeIndex = sortedSelectables.indexOf(activeSelectable);
            if (activeIndex !== -1) {


                let newIndex = indexMod(activeIndex);
                if(newIndex === activeIndex)return;
                if (newIndex > (sortedSelectables.length - 1)) newIndex = (sortedSelectables.length - 1)
                if (newIndex < 0) newIndex = 0


                newSelected = sortedSelectables[newIndex];
            } else {
                newSelected = sortedSelectables[0];
            }

        } else {
            newSelected = sortedSelectables[0];
        }
        activeSelectable.onBlur()
        newSelected && newSelected.onFocus()
        this.setState({
            activeSelectable: newSelected
        });

    }

    selectFirstElement() {
        const {
            selectables,
            activeSelectable
        } = this.state;
        let newSelected = selectables[0];

        activeSelectable.onBlur(() => {
            newSelected.onFocus();
        });
        this.setState({
            activeSelectable: newSelected
        });
    }

    registerSelectable(selectable) {
        const {
            selectables
        } = this.state;
        selectables.push({ ...selectable,
            id: selectables.length
        });
        const newSelectable = [...selectables];
        //newSelectable[0].onFocus();
        this.setState({
            selectables: newSelectable,
            activeSelectable: newSelectable[0]
        })
        this.selectComponent(x => x + 1, DPAD_DOWN);

    }
    unRegisterSelectable(target) {
        const {
            selectables
        } = this.state;
        const arr = selectables.filter((item) => item.target !== target)
        console.log(arr);
        this.setState({
            selectable: arr
        })
    }

    clearSelectables() {
        const { selectables } = this.state;
        const n = selectables.filter((item) => item.removable == false)
        this.setState({
            selectables: n,
            activeSelectable: null
        })
    }

    getChildContext() {
        return {
            registerSelectable: this.registerSelectable,
            selectFirstElement: this.selectFirstElement,
            clearSelectables: this.clearSelectables,
            unRegisterSelectable: this.unRegisterSelectable
        };
    }
}

SelectableContainer.childContextTypes = {
    registerSelectable: PropTypes.func,
    selectFirstElement: PropTypes.func,
    clearSelectables: PropTypes.func,
    unRegisterSelectable: PropTypes.func
}