import React from 'react';
import { View, Alert, StyleSheet, StatusBar, Image, ProgressBarAndroid, Button as Btn } from 'react-native';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Text, Content } from 'native-base'
import { DrawerNavigator } from 'react-navigation'
import { BrowseScreen } from '../BrowseScreen/BrowseScreen'
import { Logo } from '../../common/constants'
import { backgroundImage } from '../../common/constants'
import { DPAD_MENU } from '../../common/dpadKeyCodes';

import Tile from '../../components/Tile';
import Section from '../../components/Section';
import Browser from '../../components/Browser';
import { baseOrangeColor } from '../../common/constants';
import { config } from '../../config';
import Service from '../../common/api/service';
import Background from '../../components/Background';





class HomeScreen extends React.Component {
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

    async componentDidMount() {
        const { data: recentRelease } = await Service.GetRecentRelease();
        this.setState({ recentRelease }, () => this.refs.browser.refreshSections())

    }

    handleButton(e) {
        //console.log(e);
        const { navigate } = this.props.navigation;
        Alert.alert('from native');


    }

    openBrowse() {
        const { navigate } = this.props.navigation;
        navigate('Browse');
    }

    async openRecent(show) {
        this.props.openDialog();

        const { data: videoLink } = await Service.GetVideo(show.link);
        this.props.navigation.navigate('View', { url: videoLink.url, episode: show.episode, show })
        this.props.closeDialog();
    }

    moveNext() {
        let { selectedElement } = this.state;
        selectedElement += 1;
        this.setState({ selectedElement })
    }
    movePrev() {
        let { selectedElement } = this.state;
        selectedElement -= 1;
        this.setState({ selectedElement })
    }

    render() {

        const { navigate } = this.props.navigation;
        const { selectedElement, recentRelease } = this.state;
        const loadingRecent = (recentRelease.length === 0);
        return (


            <Container>

                <Content style={styles.page} contentContainerStyle={{ height: '100%' }} >
                    <Background />



                    {

                        loadingRecent ?
                            <View style={{ width: '100%', height: '100%', position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <ProgressBarAndroid indeterminate={true} color={baseOrangeColor} />
                            </View> :
                            <Browser style={{ paddingTop: 30 }} ref="browser" >
                                
                                <Section scrollValue={300} offsetElement={1} selectedElement={99} focus={true} >
                                    <Tile style={styles.upperSectionTile} onPress={this.openBrowse} >
                                        <View style={styles.upperSectionTileInnerView} >
                                            <Icon name='md-search' style={[styles.upperSectionTileText, styles.upperSectionTileIcon]} />
                                            <Text style={styles.upperSectionTileText}>Browse</Text>
                                        </View>
                                    </Tile>
                                    <Tile style={styles.upperSectionTile} onPress={this.openBrowse} >
                                        <View style={styles.upperSectionTileInnerView} >
                                            <Icon name='md-settings' style={[styles.upperSectionTileText, styles.upperSectionTileIcon]} />
                                            <Text style={styles.upperSectionTileText}>Configuration</Text>
                                        </View>
                                    </Tile>

                                </Section>




                                <Section title='Recent Release' scrollValue={400}>

                                    {recentRelease.map((item, i) => (
                                        <Tile.Image key={item.id} image={`${config.IMAGE}/${item.image}`} onPress={() => { this.openRecent(item) }}>
                                            <View style={{ flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap' }}>
                                                <Text style={styles.tileText}>{item.name}</Text>
                                                <Text style={styles.tileText}>{item.episode}</Text>
                                            </View>
                                        </Tile.Image>
                                    ))}
                                </Section>

                            </Browser>}




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
    },
    upperSectionTileInnerView: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    upperSectionTile: { backgroundColor: baseOrangeColor },
    upperSectionTileText: { color: 'white' },
    upperSectionTileIcon: { fontSize: 40 }
})

export default (HomeScreen)

