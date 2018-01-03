import React from 'react';
import { View, Alert, StyleSheet, StatusBar, Image, Button as Btn } from 'react-native';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Text, Content } from 'native-base'
import { DrawerNavigator } from 'react-navigation'
import { BrowseScreen } from '../BrowseScreen/BrowseScreen'
import {Logo} from '../../common/constants'
import KeyEvent from 'react-native-keyevent';
import { DPAD_MENU} from '../../common/dpadKeyCodes';
import { VideoOverlay } from '../ViewEpisode/VideoOverlay';
import Tile from '../../components/Tile';
import Section from '../../components/Section';

 

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: (({ tintColor }) => (<Icon style={{ color: tintColor }} name='home'></Icon>))
    }
    constructor(props) {
        super(props);
        this.handleButton = this.handleButton.bind(this);
    }

    componentDidMount(){
      
        // KeyEvent.onKeyDownListener((event) => {
        //     const {navigate} = this.props.navigation;
        //     switch(event.keyCode){
        //         case DPAD_MENU:
        //             navigate('DrawerToggle')      
        //             break;
                    
        //         default: 
        //         break;
        //     }
        // })
    }

    handleButton(e) {
        //console.log(e);
        const { navigate } = this.props.navigation;
        Alert.alert('from native');


    }
    render() {

        const { navigate } = this.props.navigation;

        return (


            <Container>
              
                <Content padder style={styles.page}>
                    <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-end'}} >
                        <Image source={Logo}></Image>
                    </View>
                    <Button  vertical backgroundColor='#f19d37' onPress={() => {navigate('DrawerOpen')}}>
                        <Icon name='menu'></Icon>
                        <Text>Menu</Text>
                    </Button>
                   
                    <Section title='Continue Watching' focus={true}>
                       
                            <Tile style={{ backgroundColor: 'white'}} focus={true}>
                                <View>
                                    <Text style={{ fontSize: 24, color: '#d43125' }}>NETFLIX</Text>
                                </View>
                            </Tile>
                            <Tile style={{ backgroundColor: '#1a1a1a' }}>
                                <View>
                                    <Text style={{ fontSize: 24, color: '#e05a93' }}>PLAYER</Text>
                                </View>
                            </Tile>
                            <Tile style={{ backgroundColor: '#cf4236' }}>
                                <View>
                                    <Text style={{ fontSize: 24, color: 'white' }}>YOUTUBE</Text>
                                </View>
                            </Tile>
                            <Tile style={{ backgroundColor: '#a4c94f' }}>
                                <View>
                                    <Text style={{ fontSize: 24, color: 'white' }}>HULU</Text>
                                </View>
                            </Tile>
                       
                    </Section>

                    <Section title='Favorites'>
                        <View style={{ flexDirection: 'row' }} >
                            <Tile style={{ backgroundColor: 'white' }}>
                                <View>
                                    <Text style={{ fontSize: 24, color: '#d43125' }}>NETFLIX</Text>
                                </View>
                            </Tile>
                            <Tile style={{ backgroundColor: '#1a1a1a' }}>
                                <View>
                                    <Text style={{ fontSize: 24, color: '#e05a93' }}>PLAYER</Text>
                                </View>
                            </Tile>
                            <Tile style={{ backgroundColor: '#cf4236' }}>
                                <View>
                                    <Text style={{ fontSize: 24, color: 'white' }}>YOUTUBE</Text>
                                </View>
                            </Tile>
                            <Tile style={{ backgroundColor: '#a4c94f' }}>
                                <View>
                                    <Text style={{ fontSize: 24, color: 'white' }}>HULU</Text>
                                </View>
                            </Tile>
                        </View>
                    </Section>
                    
                    
                </Content>
            </Container>


        )
    }
}




const styles = StyleSheet.create({
    header: {
        backgroundColor: '#222222'
    },
    page: {
        backgroundColor: '#222222',
        flex: 1,
        

    }
})

