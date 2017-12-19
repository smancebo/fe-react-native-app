import React from 'react';
import { DPAD_CENTER, DPAD_DOWN, DPAD_LEFT, DPAD_UP, DPAD_RIGHT, DPAD_FAST_BACKWARD, DPAD_FAST_FORWARD } from '../../common/dpadKeyCodes';
import KeyEvent from 'react-native-key-event';
import PropTypes from 'prop-types'
import { View } from 'react-native';


export default class SelectableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.registerSelectable = this.registerSelectable.bind(this);
        this.selectFirstElement = this.selectFirstElement.bind(this);
        this.selectComponent = this.selectComponent.bind(this);
        this.state = {
            activeSelectable: {},
            selectables: []
        }
    }

    componentDidMount() {
        const { onFastForward, onFastBackward } = this.props;
        KeyEvent.onKeyDownListener((event) => {
            switch (event.keyCode) {
                case DPAD_LEFT:
                    this.selectComponent(x => x - 1, DPAD_LEFT); 
                    break;
                case DPAD_RIGHT:
                    this.selectComponent(x => x + 1, DPAD_RIGHT);
                    break;

                case DPAD_FAST_FORWARD:
                    onFastForward && onFastForward();
                    break;
                case DPAD_FAST_BACKWARD:
                    onFastBackward && onFastBackward();
                    break;
            }
        })
    }

    componentWillUnmount() {
        KeyEvent.removeKeyDownListener();
    }

    render(){
        return this.props.children
    }

    selectComponent(indexMod, direction) {
        let sortedSelectables = [];
        let newSelected = {};
        const { selectables, activeSelectable } = this.state;

        if (activeSelectable) {
            if ((direction === DPAD_LEFT) || (direction === DPAD_RIGHT)) {
                sortedSelectables = selectables.sort((a, b) => a.x - b.x);
            } else if ((direction === DPAD_DOWN) || (direction === DPAD_RIGHT)) {
                sortedSelectables = selectables.sort((a, b) => a.y - b.y);
            }
            const activeIndex = sortedSelectables.indexOf(activeSelectable);
            let newIndex = indexMod(activeIndex);
            if (newIndex > (sortedSelectables.length - 1)) newIndex = (sortedSelectables.length - 1)
            if (newIndex < 0) newIndex = 0
           
            
            newSelected = sortedSelectables[newIndex];
            
        } else {
            newSelected = sortedSelectables[0];
        }
        activeSelectable.onBlur()
        newSelected.onFocus()
        this.setState({activeSelectable: newSelected});

    }

    selectFirstElement() {
        const { selectables, activeSelectable } = this.state;
        let newSelected = selectables[0];
       
        activeSelectable.onBlur(() => {
            newSelected.onFocus();
        });
        this.setState({activeSelectable: newSelected});
    }

    registerSelectable(selectable) {
        const { selectables } = this.state;
        selectables.push(selectable);
        const newSelectable = [...selectables];
        newSelectable[0].onFocus();
        this.setState({ selectables: newSelectable, activeSelectable: newSelectable[0] }) 

    }

    getChildContext() {
        return {
            registerSelectable: this.registerSelectable,
            selectFirstElement: this.selectFirstElement
        };
    }


}

SelectableContainer.childContextTypes = {
    registerSelectable: PropTypes.func,
    selectFirstElement: PropTypes.func
}