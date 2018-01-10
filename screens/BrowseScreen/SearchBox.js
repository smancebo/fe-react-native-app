import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { searchBoxUnderLineColor } from '../../common/constants'
import { Selectable } from '../../components/hoc/Selectable';
import { Icon } from 'native-base';




class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.onLayout = this.onLayout.bind(this);

    }
    state = {
        seachText: ''
    }
    handleTextChange(text) {
        this.setState({seachText: text});
    }
    onSubmit() {
        const { seachText } = this.state;
        this.props.onSubmit(seachText);
    }
    focus(){
        this._self && this._self.focus()
    }

    blur() {
        this._self && this._self.blur()
    }

    componentWillReceiveProps(newProps){
        const {focus} = newProps;
        if (focus) {
            this.focus()
        } else {
            this.blur()
        }
    }
    onLayout(e){
        //this.props.onLayout(e);
    }

    render() {
        const {searchText} = this.state
        

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }} onLayout={this.onLayout}>
                <View style={{ flex: 1 }} >
                    <TextInput autoFocus={true}
                        
                        onSubmitEditing={this.onSubmit}
                        onChangeText={this.handleTextChange}
                        underlineColorAndroid={searchBoxUnderLineColor}
                        allowFontScaling={true}
                        value={searchText}
                        ref={(x) => this._self = x}
                        style={styles.searchBox}></TextInput>
            
                </View>
                <View style={{ justifyContent: 'flex-end' }} >
                    <Icon name='md-search' style={{ color: 'white' }}></Icon>
                </View>

            </View>)
           
    }
}



export default (SearchBox);

const styles = StyleSheet.create({
    searchBox: {
        height: 60, color: 'white', fontSize: 24, padding: 10
    }
})