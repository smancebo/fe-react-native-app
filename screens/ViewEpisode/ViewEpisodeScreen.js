import React from 'react';
import {Content, Container} from 'native-base';
import {globalStyles} from '../../common/styles';
import Video from 'react-native-video'
import { StyleSheet } from 'react-native';

export default class ViewEpisodeScreen extends React.Component
{

    constructor(props){
        super(props);
        this.onLoad = this.onLoad.bind(this);
    }
    componentDidMount(){
        this.props.openDialog();
    }

    onLoad(){
        this.props.closeDialog();
        this.player.presentFullscreenPlayer();
        console.log(this.player)
    }

    render(){
        const { url, episode } = this.props.navigation.state.params;
        console.log(url);
        console.log(episode);


        return (
            <Container>
                <Content style={globalStyles.page} padder>
                    <Video style={styles.backgroundVideo} source={{ uri: url }} paused={false} ref={(x) => this.player = x} onLoadStart={this.onLoad} />
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

