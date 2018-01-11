import React from 'react';
import { View, Alert, StyleSheet, StatusBar, Image, ProgressBarAndroid , Button as Btn } from 'react-native';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Text, Content } from 'native-base'
import { DrawerNavigator } from 'react-navigation'
import { BrowseScreen } from '../BrowseScreen/BrowseScreen'
import {Logo} from '../../common/constants'
import {backgroundImage} from '../../common/constants'
import { DPAD_MENU} from '../../common/dpadKeyCodes';

import Tile from '../../components/Tile';
import Section from '../../components/Section';
import Browser from '../../components/Browser';
import { baseOrangeColor} from '../../common/constants';
import {config} from '../../config';
import Service from '../../common/api/service';
import Background from '../../components/Background';




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
            selectedElement: 0,
            recentRelease: []
        }
    }

    async componentDidMount(){
       const { data: recentRelease } = await Service.GetRecentRelease();
       this.setState({recentRelease})
        
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
        const { selectedElement, recentRelease} = this.state;
        const loadingRecent = (recentRelease.length === 0);
        return (


            <Container>
              
                <Content style={styles.page} contentContainerStyle={{height: '100%'}} >
                    <Background />
                    {/* <View style={{flex: 1, flexDirection:'row', position: 'absolute', justifyContent:'flex-end', right: 0, opacity: .3}} >
                        <Image source={Logo}></Image>
                    </View> */}
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
                    {
                    loadingRecent ? 
                    <View style={{width: '100%', height: '100%', position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <ProgressBarAndroid indeterminate={true} color={baseOrangeColor} />
                    </View> :
                    <Browser style={{paddingTop: 30}}>
                        <Section focus={true}>
                            <Tile style={{backgroundColor: baseOrangeColor}} onPress={this.openBrowse} >
                                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                                    <Icon name='md-search' style={{color: 'white'}} />
                                    <Text style={{color: 'white'}}>Browse</Text>
                                </View>
                            </Tile>
                        </Section>
                            
                       
                        
                     
                      <Section title='Recent Release' scrollValue={400}>
                            {recentRelease.map((item, i) => (
                                <Tile.Image key={item.id} image={`${config.IMAGE}/${item.image}`}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap'}}>
                                        <Text style={styles.tileText}>{item.name}</Text>
                                        <Text style={styles.tileText}>{item.episode}</Text>
                                    </View>
                                </Tile.Image>
                            ))}
                        </Section>
                      <Section title='My Watch List' scrollValue={400}>
                            {recentRelease.map((item, i) => (
                                <Tile.Image key={item.id} image={`${config.IMAGE}/${item.image}`}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap'}}>
                                        <Text style={styles.tileText}>{item.name}</Text>
                                        <Text style={styles.tileText}>{item.episode}</Text>
                                    </View>
                                </Tile.Image>
                            ))}
                        </Section>
                    
                        {/* <Section title='My List'>
                           
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
                        </Section> */}
                        {/* <Section title='My List'>
                           
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
                        </Section> */}
                    </Browser>
                    }

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
        backgroundColor: '#000000'
    },
    page: {
        backgroundColor: '#000000',
        flex: 1,
        

    },
    tileText: {
        fontSize: 13,
        color: 'white',
        textAlign: 'center'
    }
})

