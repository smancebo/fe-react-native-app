import React from 'react';
import {Container, Content} from 'native-base';
import { View } from 'react-native';
import Show from '../../components/Show';
import Paginator from '../../components/Paginator';
import SelectableContainer from '../../components/containers/SelectableContainer';
import { Episode } from '../../components/Episode';
import {globalStyles} from '../../common/styles';
 
export default class EpisodeScreen extends React.Component {
    render(){

        const { params } = this.props.navigation.state
        const { show, episodes } = params

        return(
            <Container>
                <Content padder style={globalStyles.page}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 30}}>
                            <Show { ...show } />
                        </View>
                        <View style={{flex: 70}}>
                            <SelectableContainer>
                                <Paginator pageSize={24} items={episodes} ref="paginator" template={<Episode onPress={this.onSelectedEpisode} />} />
                            </SelectableContainer>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}