import React from 'react';
import { requireNativeComponent, View, UIManager, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';
import KeyEvent from 'react-native-keyevent';
import { DPAD, DPAD_FAST_FORWARD } from '../../common/dpadKeyCodes';
import VideoOverlay  from './VideoOverlay';
import BufferingOverlay from './BufferingOverlay';


class Video extends React.Component {
    constructor(props){
        super(props);
        this._onReady = this._onReady.bind(this);
        this._onPaused = this._onPaused.bind(this);
        this._onResume = this._onResume.bind(this);
        this._onBuffering = this._onBuffering.bind(this);

        this.play = this.play.bind(this);
        this.state = {
            buffering: false,
            paused: false
        }

    }

    componentDidMount(){
        this.previousKeyDown = KeyEvent.listenerKeyDown;
        KeyEvent.removeKeyDownListener();
        KeyEvent.onKeyDownListener(( {keyCode} ) => {
            switch(keyCode){
                case DPAD.DPAD_CENTER:
                    this.togglePlayPause();
                break;

                case DPAD.DPAD_FAST_BACKWARD:
                    this.seek(-30000);
                break;

                case DPAD.DPAD_FAST_FORWARD:
                    this.seek(30000);
                break;

                case DPAD.DPAD_LEFT:
                    this.seek(-5000);
                break;

                case DPAD.DPAD_RIGHT:
                    this.seek(5000);
                break;

                case DPAD.DPAD_PLAY_PAUSA:
                    this.togglePlayPause();
                break;
            }
        })
    }

    componentWillUnmount(){
        KeyEvent.removeKeyDownListener();
        KeyEvent.onKeyDownListener(this.previousKeyDown.listener);
    }

    _onReady(event){
        if(!this.props.onReady){
            return;
        }
        setTimeout(() => {
            this.props.onReady(event)
        }, 1000);
       
    }

    _onPaused(event){
        this.setState({ paused: true });
        this.props.onPaused && this.props.onPaused(event);
    }

    _onResume(event){
        this.setState({paused: false, buffering: false})
        this.props.onResume && this.props.onResume(event);
    }

    _onBuffering(event){

        this.setState({ buffering: true });
        this.props.onBuffering && this.props.onBuffering(event);
    }

    release(){
        this._dispatchCommand('release', [])
    }
    pause(){
        this._dispatchCommand('pause', []);
    }
    togglePlayPause(){
        this._dispatchCommand('toggle_play_pause', []);
    }
    play(){
        this._dispatchCommand('play', []);
    }
    seek(time){
        this._dispatchCommand('seek', [time])
    }
    render() {
        const { paused, buffering} = this.state
        return (
            <View>
                <VideoOverlay visible={paused} show={this.props.showInfo} />
                <BufferingOverlay visible={buffering} />
                <RCTVideoView ref="videoView" {...this.props} onReady={this._onReady} onPaused={this._onPaused} onResume={this._onResume} onBuffering={this._onBuffering} />
            </View>
        )
    }

    _dispatchCommand(command, args){
        UIManager.dispatchViewManagerCommand(findNodeHandle(this.refs.videoView), UIManager.RCTVideoView.Commands[command], args);
    }
}



Video.propTypes = {
    source: PropTypes.string,
    autoplay: PropTypes.bool,
    ...View.propTypes
};

const RCTVideoView = requireNativeComponent("RCTVideoView", Video, {nativeOnly: {onReady: true, onPaused: true, onResume: true, onBuffering: true}});

export default Video;