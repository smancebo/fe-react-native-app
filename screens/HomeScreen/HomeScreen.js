import React from 'react';
import { View, StyleSheet, ProgressBarAndroid} from 'react-native';
import { Container, Content, Icon, Text } from 'native-base'
import Tile from '../../components/Tile';
import Section from '../../components/Section';
import Browser from '../../components/Browser';
import { baseOrangeColor } from '../../common/constants';
import { config } from '../../config';
import Service from '../../common/api/service';
import Background from '../../components/Background';


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.openRecent = this.openRecent.bind(this);

        this.state = {
            recentRelease: []
        }
    }

    async componentDidMount() {
        const { data: recentRelease } = await Service.GetRecentRelease();
        this.setState({ recentRelease }, () => this.refs.browser.refreshSections())

    }

   
    navigate(page){
        const {navigate} = this.props.navigation;
        navigate(page);
    }

    async openRecent(show) {
        this.props.openDialog();
        const { navigate } = this.props.navigation;

        const { data: videoLink } = await Service.GetVideo(show.link);
        navigate('View', { url: videoLink.url, episode: show.episode, show })

        this.props.closeDialog();
    }

    render() {

        const { recentRelease } = this.state;
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

                                <Section scrollValue={300} offsetElement={1} >
                                    <Tile style={styles.upperSectionTile} onPress={() => this.navigate('Browse')} >
                                        <View style={styles.upperSectionTileInnerView} >
                                            <Icon name='md-search' style={[styles.upperSectionTileText, styles.upperSectionTileIcon]} />
                                            <Text style={styles.upperSectionTileText}>Browse</Text>
                                        </View>
                                    </Tile>
                                    <Tile style={styles.upperSectionTile} onPress={() => {this.navigate('Config')}} >
                                        <View style={styles.upperSectionTileInnerView} >
                                            <Icon name='md-settings' style={[styles.upperSectionTileText, styles.upperSectionTileIcon]} />
                                            <Text style={styles.upperSectionTileText}>Settings</Text>
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

                            </Browser>
                        }
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
    upperSectionTile: { backgroundColor: '#222', width: 140, height: 120 },
    upperSectionTileText: { color: 'white' },
    upperSectionTileIcon: { fontSize: 40 }
})

export default (HomeScreen)

