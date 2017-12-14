import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { searchBoxUnderLineColor } from '../../common/constants'

export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
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

    render() {
        
        return (
            <TextInput autoFocus
                onSubmitEditing={this.onSubmit} 
                onChangeText={this.handleTextChange} 
                underlineColorAndroid={searchBoxUnderLineColor}
                allowFontScaling={true} 
                value={this.state.seachText}
                style={styles.searchBox}></TextInput>
            )
    }
}

const styles = StyleSheet.create({
    searchBox: {
        height: 60, color: 'white', fontSize: 24, padding: 10
    }
})