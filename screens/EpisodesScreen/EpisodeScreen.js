import React from 'react';
import {Container, Content} from 'native-base';
import { View, Image, StyleSheet, BackHandler } from 'react-native';
import Show from '../../components/Show';
import Paginator from '../../components/Paginator';
import SelectableContainer from '../../components/containers/SelectableContainer';
import EpisodeList from '../../components/EpisodeList';
import {globalStyles} from '../../common/styles';
import KeyEvent from 'react-native-keyevent';

import { config } from '../../config'
import  Service from '../../common/api/service';
import Background from '../../components/Background';
 
export default class EpisodeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.onEpisodeSelected = this.onEpisodeSelected.bind(this);
    }
    
    async onEpisodeSelected(episode, backHandler){
        this.props.openDialog();
        const { show } = this.props.navigation.state.params;
        const {data: videoLink} = await Service.GetVideo(episode.link);
        console.log(videoLink);
        this.props.navigation.navigate('View', {url: videoLink.url, episode, show, backHandler})
        this.props.closeDialog();
    }
    render(){

        const { params } = this.props.navigation.state
        const { show, episodes } = params

        return(
            <Container style={{height: '100%'}}  >
                <Content style={globalStyles.page} contentContainerStyle={{height: '100%'}} >
                   
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 30}}>
                            <View style={style.absoluteContainer}>
                                <Image source={{uri: `${config.API}/image/${show.image}`}} blurRadius={5} style={style.absoluteImage} />
                            </View>
                            <View style={style.showContainer}>
                                <Show {...show} style={style.show} />
                            </View>
                            
                        </View>
                        <View style={{flex: 70}}>
                            <EpisodeList episodes={episodes} onEpisodeSelected={this.onEpisodeSelected} />
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    absoluteContainer: { position: 'absolute', width: '100%', height: '100%' },
    absoluteImage: { left: 0, top: 0, height: '100%', width: '100%', opacity: .5 },
    showContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    show: { height: 400 }
})
