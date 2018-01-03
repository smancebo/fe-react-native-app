import React from 'react';
import { requireNativeComponent, View, UIManager, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';


class Video extends React.Component {
    constructor(props){
        super(props);
        this._onReady = this._onReady.bind(this);
        this._onPaused = this._onPaused.bind(this);
        this._onResume = this._onResume.bind(this);
        this.play = this.play.bind(this);

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
        if(!this.props.onPaused){
            return;
        }
        this.props.onPaused(event);
    }

    _onResume(event){
        if(!this.props.onResume){
            return ;
        }
        this.props.onResume(event);
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
    render() {
        return (<RCTVideoView {...this.props} onReady={this._onReady} onPaused={this._onPaused} onResume={this._onResume} />)
    }

    _dispatchCommand(command, args){
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), UIManager.RCTVideoView.Commands[command], args);
    }
}

Video.propTypes = {
    source: PropTypes.string,
    autoplay: PropTypes.bool,
    ...View.propTypes
};

const RCTVideoView = requireNativeComponent("RCTVideoView", Video, {nativeOnly: {onReady: true, onPaused: true, onResume: true}});

export default Video;