import React from 'react';
import {Content, Container, Text} from 'native-base';
import {globalStyles} from '../../common/styles';
import Video from '../../components/native/Video';
import { StyleSheet, WebView, View } from 'react-native';
import { config } from '../../config';
import videoHtml from './video.html';

export default class ViewEpisodeScreen extends React.Component
{

    constructor(props){
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onVideoReady = this.onVideoReady.bind(this);
    }
    componentDidMount(){
        //this.props.openDialog();
    }

    onLoad(){
        this.props.closeDialog();
        this.player.presentFullscreenPlayer();
        console.log(this.player)
    }

    onVideoReady(event) {
        console.log(event);
        this.props.closeDialog();
        this.refs.videoPlayer.play();
    }
    render(){
        const { url, episode } = this.props.navigation.state.params;
        
       

        const videoUrl = url.indexOf('openload') !== -1 ? `${config.API}/watch?video=${url}` : url
       
        return (
            <Container>
                <Content style={[globalStyles.page]} contentContainerStyle={{height: '100%'}}>
                    <View style={styles.container}>
                        <WebView injectedJavaScript={`setVideoUrl('${videoUrl}')`} mediaPlaybackRequiresUserAction={false} source={videoHtml} style={styles.fullContent} ></WebView>
                        {/* <Video source={videoUrl} ref="videoPlayer" onReady={this.onVideoReady} autoplay={true} style={{width: '100%', height: '100%'}} /> */}
                    </View>
                    
                </Content>
            </Container>
        )
    }
    componentWillUnmount(){
        
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
    fullContent: {
       flex: 1,
       backgroundColor: 'black'
    },
    container: { 
        width: '100%', 
        height: '100%',
        flexDirection: 'column'
    }

});

