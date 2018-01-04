import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import ScrollList from './ScrollList';
import KeyEvent from 'react-native-keyevent';
import {DPAD} from '../common/dpadKeyCodes';


const sectionHeight = 80;
export default class Browser extends React.Component
{
    constructor(props){
        super(props);
        this.scrollValue = new Animated.Value(0)
        this.selectSection = this.selectSection.bind(this);
        this.state = {
            sections:[],

            selectedSection: {
                index: 0,
                currentItem: 0
            }
        }
    }

    componentDidMount(){
        let sections = React.Children.map(this.props.children, (child, i) => { 
            const {selectedElement : currentItem = 0} = child.props;
            return {index: i, currentItem}
        });

        this.setState({sections});
        KeyEvent.removeKeyDownListener();
        KeyEvent.onKeyDownListener(({keyCode}) => {
            switch(keyCode){
                case DPAD.DPAD_UP:
                    this.selectSection(DPAD.DPAD_UP)
                break;

                case DPAD.DPAD_DOWN:
                    this.selectSection(DPAD.DPAD_DOWN)
                break;

                case DPAD.DPAD_LEFT:
                break;

                case DPAD.DPAD_RIGHT:
                break;

                case DPAD.DPAD_CENTER:
                break;
            }
        })
    }

    selectSection(dpadDirection){
        const { selectedSection, sections } = this.state;
        
        let newSections = [...sections];
        let index = selectedSection.index;

        newSections[index] = selectedSection;

        if(dpadDirection === DPAD.DPAD_UP){
            if(index === 0){
                return ;
            }
            index--;
        } else if( dpadDirection === DPAD.DPAD_DOWN){
            if(index === (sections.length -1)){
                return;
            }
            index++
        }
        const newSelection = newSections[index];
        

        this.setState({ selectedSection: newSelection, sections: newSections });

    }

    _onItemSelected(item){
        this.props.onItemSelected(item);
    }

    render(){
        const { children } = this.props;
        const { selectedSection } = this.state

        return (
            <View style={styles.browser}>
                <ScrollList direction='vertical' position={selectedSection.index} moveValue={sectionHeight} >
                    {React.Children.map(children, (child, i) => <child.type {...child.props} focus={i === selectedSection.index ? true : false} selectedElement={selectedSection.currentItem} onItemSelected={this._onItemSelected} />)}
                </ScrollList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    browser: {
        height: '100%',
        overflow: 'hidden'
    }
})