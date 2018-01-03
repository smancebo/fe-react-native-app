import React from 'react';
import {Content, Container, Text} from 'native-base';
import {globalStyles} from '../../common/styles';
import Video from '../../components/native/Video';
import { StyleSheet, WebView, View } from 'react-native';
import { config } from '../../config';
import videoHtml from './video.html';
import { VideoOverlay } from './VideoOverlay';
import KeyEvent from 'react-native-keyevent'

export default class ViewEpisodeScreen extends React.Component
{
    constructor(props){
        super(props);
        this.onVideoReady = this.onVideoReady.bind(this);
        this.onVideoPaused = this.onVideoPaused.bind(this);
        this.onVideoResume = this.onVideoResume.bind(this);
        this.showOverlay = this.showOverlay.bind(this);
        
        this.state = {
            showOverlay: false
        }
    }
    componentDidMount(){
        this.props.openDialog();
        
    }

    onVideoReady(event) {
        this.props.closeDialog();
        this.refs.videoPlayer.play();
    }

    onVideoPaused(event) {

    }

    onVideoResume(event){

    }

    showOverlay(display) {
        const show = display instanceof Boolean ? display : undefined || false
        this.setState({showOverlay: display})
    }

    render(){
        const { url, episode, show } = this.props.navigation.state.params;
        const {showOverlay} = this.state
        const videoUrl = url.indexOf('openload') !== -1 ? `${config.API}/watch?video=${url}` : url
       
        return (
            <Container>
                <Content style={[globalStyles.page]} contentContainerStyle={{height: '100%'}}>
                    <View style={styles.container}>
                        <VideoOverlay visible={showOverlay} show={{ episode: episode.name , name: show.title, image: show.image }} />
                        {/* <WebView injectedJavaScript={`setVideoUrl('${videoUrl}')`} mediaPlaybackRequiresUserAction={false} source={videoHtml} style={styles.fullContent} ></WebView> */}
                        <Video source={videoUrl} ref="videoPlayer" 
                            onReady={this.onVideoReady} 
                            onPaused={this.onVideoPaused}
                            onResume={this.onVideoResume}
                            autoplay={true} 
                            style={styles.player} />
                    </View>
                </Content>
            </Container>
        )
    }
    componentWillUnmount(){
        this.refs.videoPlayer.release();
        
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
    player: { width: '100%', height: '100%' },
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

