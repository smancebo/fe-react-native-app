import React from 'react';
import { Text, View, TextInput, ScrollView, Alert } from 'react-native';
import { Icon, Container, Content } from 'native-base'
import { globalStyles } from '../../common/styles';

const a = new Array(100).fill('');
class BrowseScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Browse',
        drawerIcon: (({ tintColor }) => (<Icon style={{ color: tintColor }} name='md-search'></Icon>))

    }

    handleKeyboard(e) {
        console.log(e)
    }

    render() {
        return (
            <Container>
                <Content style={globalStyles.page} padder >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <TextInput autoFocus onKeyPress={this.handleKeyboard} underlineColorAndroid='#f19d37' allowFontScaling={true} style={{ height: 60, color: 'white', fontSize: 24, padding: 10 }}></TextInput>
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
export default BrowseScreen