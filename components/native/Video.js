import React from 'react';
import { requireNativeComponent, View, UIManager, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';


class Video extends React.Component {
    constructor(props){
        super(props);
        this._onReady = this._onReady.bind(this);
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

    play(){
        this._dispatchCommand('play', []);
    }
    render() {
        return (<RCTVideoView {...this.props} onReady={this._onReady} />)
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

const RCTVideoView = requireNativeComponent("RCTVideoView", Video, {nativeOnly: {onReady: true}});

export default Video;