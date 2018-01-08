import React from 'react';
import { View, Alert, StyleSheet, StatusBar, Image, ProgressBarAndroid , Button as Btn } from 'react-native';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Text, Content } from 'native-base'
import { DrawerNavigator } from 'react-navigation'
import { BrowseScreen } from '../BrowseScreen/BrowseScreen'
import {Logo} from '../../common/constants'
import {backgroundImage} from '../../common/constants'
import KeyEvent from 'react-native-keyevent';
import { DPAD_MENU} from '../../common/dpadKeyCodes';
import { VideoOverlay } from '../ViewEpisode/VideoOverlay';
import Tile from '../../components/Tile';
import Section from '../../components/Section';
import Browser from '../../components/Browser';
import { baseOrangeColor} from '../../common/constants';
import {config} from '../../config';
import Service from '../../common/api/service';


const apiData = [
    {
        id: 0,
        name: "YOUKAI APARTMENT NO YUUGA NA NICHIJOU (2017) (Español España)",
        link: "d07f743517e2c7d0b256153dc6d9dc19aba7aa4e775eb5103d7007ae24699d9cfcf877440f3b2d59b8f19b693b1e4c2ac24cb7449e207d8b821b921b431dfd56e30925d1d3b8501d8e599d5f7cf9d39c0f4a40945294daf437442ca4fbf8d476",
        image: "41ac5ab38eead990a1670ec71b2a2a577166d2d34059b091343cf5478dcb36b98bda98223d11d1eba4fd4597e9f0a2c003164ea95f76a6809c7a6b333fbe95ba2cdb604d742ae9dc579c6b7bef6ea636",
        episode: "Episodio 26"
    },
    {
        id: 1,
        "name": "FOLKTALES FROM JAPAN S2 (2017) (Español España)",
        "link": "d07f743517e2c7d0b256153dc6d9dc1953ecc772ef970ae1acf049db931ea1b3ac938a9613e052785f7f37a30705e43549c1ee43947033fb298184ceda89c9b9fb167b7737610afc2e77b00a41f62771e21089e9a62e4d7be1c1b29d5124605d",
        "image": "41ac5ab38eead990a1670ec71b2a2a577166d2d34059b091343cf5478dcb36b9d832f1badee34ac2a2a17d001df55274eaef3e8f9788a3b606bde2a9e8817ce278fbe50430384c0b0f3147d9a2beb1fc",
        "episode": "Episodio 39"
    },
    {
        id: 2,
        "name": "Yuru Camp△ (2018)",
        "link": "d07f743517e2c7d0b256153dc6d9dc1978e97f32c20038c1f88a4779cbd35ddc73df33f50d661e154577f11f12ab8db694504d747d3f60d660764421ff4fd334",
        "image": "41ac5ab38eead990a1670ec71b2a2a577166d2d34059b091343cf5478dcb36b9fba2ba59d9def78dfcc3046ec4e97ba384813f2832f445657031ab7bd2e9dcc4b0bf95e2fdc41d547838300391c3da9e",
        "episode": "Episodio 1"
    },
    {
        id: 3,
        "name": "Ramen Daisuki Koizumi-san (2018)",
        "link": "d07f743517e2c7d0b256153dc6d9dc19c7884c0d4f5a1000873eb8ebd1e3e1d4d251f94dd0790bb3f3ee675f6d246907b4383495f3b68bca23ccedebbe6c7c4ce42ec29620d15871c7d9a0eab2db73ad",
        "image": "41ac5ab38eead990a1670ec71b2a2a577166d2d34059b091343cf5478dcb36b9fba2ba59d9def78dfcc3046ec4e97ba3204ab354587dcf785f08c966908b41049e5a5b189262aca40bf141b35cecf803",
        "episode": "Episodio 1"
    }];

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
                    <View style={{width: '100%', height: '100%', position: 'absolute', opacity: .4}}>
                        <Image source={backgroundImage} resizeMode='stretch' style={{width: '100%', height: '100%'}} />
                    </View>
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
                    
                    <Browser style={{paddingTop: 30}}>
                        <Section focus={true}>
                            <Tile style={{backgroundColor: baseOrangeColor}} onPress={this.openBrowse} >
                                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                                    <Icon name='md-search' style={{color: 'white'}} />
                                    <Text style={{color: 'white'}}>Browse</Text>
                                </View>
                            </Tile>
                        </Section>
                            
                       
                      {  
                      loadingRecent ? <ProgressBarAndroid indeterminate={true} color={baseOrangeColor} /> :
                      <Section title='Recent Release' scrollValue={200}>
                            {recentRelease.map((item, i) => (
                                <Tile.Image key={item.id} image={`${config.IMAGE}/${item.image}`}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap'}}>
                                        <Text style={styles.tileText}>{item.name}</Text>
                                        <Text style={styles.tileText}>{item.episode}</Text>
                                    </View>
                                </Tile.Image>
                            ))}
                        </Section>
                    }
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
        fontSize: 11,
        color: 'white',
        textAlign: 'center'
    }
})

