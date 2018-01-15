import React from 'react';
import {Content, Container, Text} from 'native-base';
import {globalStyles} from '../../common/styles';
import Video from '../../components/native/Video';
import { StyleSheet, WebView, View, ProgressBarAndroid, BackHandler } from 'react-native';
import { config } from '../../config';
import videoHtml from './video.html';
import KeyEvent from 'react-native-keyevent'
import { baseOrangeColor } from '../../common/constants';

export default class ViewEpisodeScreen extends React.Component
{
    constructor(props){
        super(props);
        this.onVideoReady = this.onVideoReady.bind(this);
        this.onVideoPaused = this.onVideoPaused.bind(this);
        this.onVideoResume = this.onVideoResume.bind(this);
        this.onVideoBuffering = this.onVideoBuffering.bind(this);
        this.showOverlay = this.showOverlay.bind(this);
        
        this.state = {
            showOverlay: false
        }
    }
    componentDidMount(){
        const { backHandler} = this.props.navigation.state.params;
        BackHandler.addEventListener("hardwareBackPress", () =>  false);
        this.backHandler = backHandler;
        this.props.openDialog();
       
    }

    onVideoReady(event) {
        this.props.closeDialog();
        this.refs.videoPlayer.play();
    }

    onVideoPaused(event) {
        //this.showOverlay(true);
    }

    onVideoResume(event){
        this.props.closeDialog();
        //this.showOverlay(false);
    }

    onVideoBuffering(event){
        //this.props.openDialog();
    }

    showOverlay(display) {
        const show = display instanceof Boolean ? display : undefined || false
        this.setState({showOverlay: display})
    }

    render(){
        const { url, episode, show } = this.props.navigation.state.params;
        const {showOverlay} = this.state
        //const videoUrl = url.indexOf('openload') !== -1 ? `${config.API}/watch?video=${url}` : url
        const videoUrl = `${config.API}/watch?video=${url}`
       
        return (
            <Container>
                <Content style={[globalStyles.page]} contentContainerStyle={{height: '100%'}}>
                    <View style={styles.container}>
                        
                       
                        {/* <WebView injectedJavaScript={`setVideoUrl('${videoUrl}')`} mediaPlaybackRequiresUserAction={false} source={videoHtml} style={styles.fullContent} ></WebView> */}
                        <Video source={videoUrl} ref="videoPlayer" 
                            onReady={this.onVideoReady} 
                            onPaused={this.onVideoPaused}
                            onResume={this.onVideoResume}
                            onBuffering={this.onVideoBuffering}
                            showInfo={{ episode: episode.name, name: show.title, image: show.image }}
                            autoplay={true} 
                            style={styles.player} />
                    </View>
                </Content>
            </Container>
        )
    }
    componentWillUnmount(){
        this.refs.videoPlayer && this.refs.videoPlayer.release();
        BackHandler.addEventListener("hardwareBackPress", this.backHandler);
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

