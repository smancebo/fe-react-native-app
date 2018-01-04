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
import Browser from '../../components/Browser';
import { baseOrangeColor} from '../../common/constants';

 

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: (({ tintColor }) => (<Icon style={{ color: tintColor }} name='home'></Icon>))
    }
    constructor(props) {
        super(props);
        this.handleButton = this.handleButton.bind(this);
        this.moveNext = this.moveNext.bind(this);
        this.movePrev = this.movePrev.bind(this);
        this.openBrowse = this.openBrowse.bind(this);

        this.state = {
            selectedElement: 0
        }
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

    openBrowse(){
        const {navigate} = this.props.navigation;
        navigate('Browse');
    }

    moveNext(){
        let {selectedElement} = this.state;
        selectedElement += 1;
        this.setState({selectedElement}) 
    }
    movePrev(){
        let { selectedElement } = this.state;
        selectedElement -= 1;
        this.setState({ selectedElement }) 
    }
    
    render() {

        const { navigate } = this.props.navigation;
        const { selectedElement} = this.state;
        return (


            <Container>
              
                <Content padder style={styles.page}>
                    <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-end'}} >
                        <Image source={Logo}></Image>
                    </View>
                    {/* <Button  vertical backgroundColor='#f19d37' onPress={() => {navigate('DrawerOpen')}}>
                        <Icon name='menu'></Icon>
                        <Text>Menu</Text>
                    </Button> */}
                    {/* <Button onPress={this.moveNext}>
                        <Text> Next </Text>
                    </Button>
                    <Button onPress={this.movePrev}>
                        <Text> Prev </Text>
                    </Button> */}
                    
                    <Browser>
                        <Section focus={true}>
                            <Tile style={{backgroundColor: baseOrangeColor}} onPress={this.openBrowse} >
                                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                                    <Icon name='md-search' style={{color: 'white'}} />
                                    <Text style={{color: 'white'}}>Browse</Text>
                                </View>
                            </Tile>
                        </Section>
                            
                        <Section title='Continue Watching'>
                           
                                <Tile style={{ backgroundColor: 'white'}} >
                                    <View>
                                        <Text style={{ fontSize: 24, color: '#d43125' }}>NETFLIX</Text>
                                    </View>
                                </Tile>
                                <Tile style={{ backgroundColor: '#e05a93' }}>
                                    <View>
                                        <Text style={{ fontSize: 24, color: 'white' }}>PLAYER</Text>
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
                                <Tile style={{ backgroundColor: 'white'}} >
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
                    </Browser>

                    {/* <Section title='Favorites'>
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
                    </Section> */}
                    
                    
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

