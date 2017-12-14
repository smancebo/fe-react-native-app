import React from 'react';
import { Text, View, TextInput, ScrollView, Alert, StyleSheet, Modal, ProgressBarAndroid } from 'react-native';
import { Icon, Container, Content } from 'native-base'
import { globalStyles } from '../../common/styles';
import SearchBox from './SearchBox';
import Service from '../../common/api/service';

const a = new Array(100).fill('');
class BrowseScreen extends React.Component {
    
    static navigationOptions = {
        drawerLabel: 'Browse',
        drawerIcon: (({ tintColor }) => (<Icon style={{ color: tintColor }} name='md-search'></Icon>))

    }

    async onSeachSubmit(text) {
        const results = await Service.Search(text);
    }

    componentDidMount(){
        this.props.openDialog()
    }

    
   
    render() {
        return (
            <Container>

                <Content style={globalStyles.page} padder >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <SearchBox onSubmit={this.onSeachSubmit} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Icon name='md-search' style={{ color: 'white' }}></Icon>
                        </View>

                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between' }}>
                    
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
   modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey'
   },
   innerContainer: {
       alignItems: 'center'
   }
})
export default BrowseScreen