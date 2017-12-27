import React from 'react';
import {Content, Container, Text} from 'native-base';
import {globalStyles} from '../../common/styles';
import Video from '../../components/native/Video';
import { StyleSheet } from 'react-native';
import { config } from '../../config';

export default class ViewEpisodeScreen extends React.Component
{

    constructor(props){
        super(props);
        this.onLoad = this.onLoad.bind(this);
    }
    componentDidMount(){
        //this.props.openDialog();
    }

    onLoad(){
        this.props.closeDialog();
        this.player.presentFullscreenPlayer();
        console.log(this.player)
    }

    render(){
        const { url, episode } = this.props.navigation.state.params;
        
        console.log(episode);

        const videoUrl = url.indexOf('openload') !== -1 ? `${config.API}/watch?video=${url}` : url
        console.log(videoUrl)
        return (
            <Container>
                <Content style={globalStyles.page} padder>
                    <Text> this is text</Text>
                    <Video source={videoUrl} ref={(x) => console.log(x)} autoplay={true} style={{width: 300, height: 300}}  />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

