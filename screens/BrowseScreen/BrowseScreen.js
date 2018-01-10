import React from 'react';
import { View, TextInput, ScrollView, Alert, StyleSheet, Modal, ProgressBarAndroid } from 'react-native';
import { Icon, Container, Content, Grid, Col, Button, Text, } from 'native-base'
import { globalStyles } from '../../common/styles';
import SearchBox from './SearchBox';
import Service from '../../common/api/service';
import Show  from '../../components/Show';
import Paginator from '../../components/Paginator';
import SelectableContainer from '../../components/containers/SelectableContainer'
import Background from '../../components/Background';
import Browser from '../../components/Browser';
import Section from '../../components/Section';
import Tile from '../../components/Tile';
import {config} from '../../config';

const a = new Array(100).fill('');
class BrowseScreen extends React.Component {

    constructor(props) {
        super(props)
        this.onSeachSubmit = this.onSeachSubmit.bind(this);
        this.openShow = this.openShow.bind(this);
        this.onRegisterElement = this.onRegisterElement.bind(this);
        this.state = {
            results: []
        }
    }
    static navigationOptions = {
        drawerLabel: 'Browse',
        drawerIcon: (({ tintColor }) => (<Icon style={{ color: tintColor }} name='md-search'></Icon>))

    }

    async onSeachSubmit(text) {
        this.props.openDialog();
        try {
            const { data: results } = await Service.Search(text).catch((err) => { throw err });
            this.setState({ results })
            this.props.closeDialog();
            this.refs.browser.refreshSections()
            //this.refs._selectableContainer.selectElement(1);
        }
        catch( ex){
            this.props.closeDialog();
            Alert.alert('Error', ex.message);
        }
        
       
    }

    componentDidMount() {

    }

    async openShow(e){
        const { navigate } = this.props.navigation;
        this.props.openDialog();
        const { data: episodes} = await Service.GetEpisodes(e.link).catch((err) => {})
        
        this.props.closeDialog();
        navigate('Episodes', { episodes, show: e});
    }

    onRegisterElement() {
        this.refs._selectableContainer.selectElement(1);
    }

    render() {
        const { results } = this.state;
        const { navigation } = this.props;
        
        const fowardPage = () => {
            this._paginator && this._paginator.forwardPage()
        }
        const backwardPage = () => {
            this._paginator && this._paginator.backwardPage()
        }

        return (
            <Container>

                <Content style={globalStyles.page} contentContainerStyle={{ height: '100%' }} >
                    <Background />
                    <View style={{padding: 5}}>
                        <Browser ref="browser" moveValue={80} style={{paddingTop: 0}} offsetY={0} >
                            <Section focus={true}>
                                <SearchBox onSubmit={this.onSeachSubmit} />
                            </Section>
                            <Section scrollValue={420} offsetElement={1}>
                                {results.map((item) => (
                                    <Tile.Show image={`${config.IMAGE}/${item.image}`} key={`${item.id}_${Math.random()}`} onPress={() => {this.openShow(item)}}>
                                        <Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}>{item.title}</Text>
                                    </Tile.Show>
                                ))}
                            </Section>
                        </Browser>
                        {/* <SelectableContainer onFastForward={fowardPage} onFastBackward={backwardPage} ref="_selectableContainer" >
                            
                            <SearchBox onSubmit={this.onSeachSubmit} />
                            <View style={{ paddingTop: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch' }}>
                                <Paginator ref={(x) => this._paginator = x}  pageSize={3} items={results} template={<Show onPress={this.openShow} />} />
                            </View>
                        </SelectableContainer> */}
                    </View>

                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey'
    },
    innerContainer: {
        alignItems: 'center'
    }
})
export default BrowseScreen