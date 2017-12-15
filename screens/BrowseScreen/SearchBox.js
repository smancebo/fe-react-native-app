import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { searchBoxUnderLineColor } from '../../common/constants'

export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        const {searchText} = this.state
        return (
            <TextInput autoFocus
                onSubmitEditing={this.onSubmit} 
                onChangeText={this.handleTextChange} 
                underlineColorAndroid={searchBoxUnderLineColor}
                allowFontScaling={true} 
                value={searchText}
                style={styles.searchBox}></TextInput>
            )
    }
}

const styles = StyleSheet.create({
    searchBox: {
        height: 60, color: 'white', fontSize: 24, padding: 10
    }
})