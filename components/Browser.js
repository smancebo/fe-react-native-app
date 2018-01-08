import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import ScrollList from './ScrollList';
import KeyEvent from 'react-native-keyevent';
import {DPAD} from '../common/dpadKeyCodes';


const sectionHeight = 100;
export default class Browser extends React.Component
{
    constructor(props){
        super(props);
        this.scrollValue = new Animated.Value(0)
        this.selectSection = this.selectSection.bind(this);
        this.selectElement = this.selectElement.bind(this);
        this.pressElement = this.pressElement.bind(this);
        this._onSectionElementSelected = this._onSectionElementSelected.bind(this);
        this.registerSections = this.registerSections.bind(this);
        this.currentItem = 0;
        this.state = {
            sections:[],

            selectedSection: {
                index: 0,
                currentItem: 0,
                childrens: 0
            }
        }
    }

    registerSections(){
        let sections = React.Children.map(this.props.children, (child, i) => {
            const childrens = React.Children.toArray(child.props.children);
            const { selectedElement: currentItem = 0 } = child.props;
            return { index: i, currentItem, childrens: childrens.length }
        });

        this.setState({ sections });
    }

    componentDidMount(){
        let sections = React.Children.map(this.props.children, (child, i) => { 
            const childrens = React.Children.toArray(child.props.children);
            const {selectedElement : currentItem = 0} = child.props;
            return { index: i, currentItem, childrens: childrens.length}
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
                    this.selectElement(DPAD.DPAD_LEFT);
                break;

                case DPAD.DPAD_RIGHT:
                    this.selectElement(DPAD.DPAD_RIGHT);
                break;

                case DPAD.DPAD_CENTER:
                    this.pressElement();
                break;
            }
        })
    }

    selectSection(dpadDirection){
        if (this.state.selectedSection.childrens === 0) {
            this.registerSections();
        }
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
        this.currentItem = newSelection.currentItem;
    
        this.setState({ selectedSection: newSelection, sections: newSections });

    }

    selectElement(dpadDirection){
        if (this.state.selectedSection.childrens === 0) {
            this.registerSections();

        }
        let { selectedSection } = this.state;
        
       
        if(dpadDirection === DPAD.DPAD_RIGHT){
            if(selectedSection.currentItem < (selectedSection.childrens - 1)){
                selectedSection.currentItem++;
            }

        } else if(dpadDirection === DPAD.DPAD_LEFT){
            if(selectedSection.currentItem > 0){
                selectedSection.currentItem--;
            }
            
        }
        //selectedSection.currentItem = this.currentItem;
        this.setState({selectedSection});
    }

    pressElement(){
        const {selectedSection} = this.state;
        const Elements = React.Children.toArray(React.Children.toArray(this.props.children)[selectedSection.index].props.children);
        const {onPress = () => {}} = Elements[selectedSection.currentItem].props;

        onPress();

    }

    _onSectionElementSelected(currentItem){
        //this.currentItem = currentItem;
        //this.setState({selectedSection});
    }

    _onItemSelected(item){
        this.props.onItemSelected(item);
    }

    render(){
        const { children } = this.props;
        const { selectedSection, sections } = this.state

        return (
            <View style={styles.browser}>
                <ScrollList direction='vertical' position={selectedSection.index} moveValue={sectionHeight} >
                    {React.Children.map(children, (child, i) => <child.type {...child.props} focus={i === selectedSection.index ? true : false} onSelectedElement={this._onSectionElementSelected} selectedElement={i === selectedSection.index ? selectedSection.currentItem : sections[i] === undefined ? 0 : sections[i].currentItem} onItemSelected={this._onItemSelected} />)}
                </ScrollList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    browser: {
        paddingTop: 60,
        height: 500,
        overflow: 'hidden'
    }
})