import React from 'react';
import {Container, Content} from 'native-base';
import { View, Image, StyleSheet } from 'react-native';
import Show from '../../components/Show';
import Paginator from '../../components/Paginator';
import SelectableContainer from '../../components/containers/SelectableContainer';
import EpisodeList from '../../components/EpisodeList';
import {globalStyles} from '../../common/styles';

import { config } from '../../config'
 
export default class EpisodeScreen extends React.Component {
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
                           <EpisodeList episodes={episodes} />
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
