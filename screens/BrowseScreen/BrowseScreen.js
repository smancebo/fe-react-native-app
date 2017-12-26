import React from 'react';
import { View, TextInput, ScrollView, Alert, StyleSheet, Modal, ProgressBarAndroid } from 'react-native';
import { Icon, Container, Content, Grid, Col, Button, Text, } from 'native-base'
import { globalStyles } from '../../common/styles';
import SearchBox from './SearchBox';
import Service from '../../common/api/service';
import Show  from '../../components/Show';
import Paginator from '../../components/Paginator';
import SelectableContainer from '../../components/containers/SelectableContainer'

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
            this.refs._selectableContainer.selectElement(1);
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
        const { data: episodes} = await Service.GetEpisodes(e.link).catch((err) => {console.log(err)})
        
        this.props.closeDialog();
        navigate('Episodes', { episodes, show: e});
    }

    onRegisterElement() {
        this.refs._selectableContainer.selectElement(1);
    }

    render() {
        const { results } = this.state;
        const { navigation } = this.props;
        console.log(navigation);
        const fowardPage = () => {
            this._paginator && this._paginator.forwardPage()
        }
        const backwardPage = () => {
            this._paginator && this._paginator.backwardPage()
        }

        return (
            <Container>

                <Content style={globalStyles.page} padder >

                    <SelectableContainer onFastForward={fowardPage} onFastBackward={backwardPage} ref="_selectableContainer" >
                        
                        <SearchBox onSubmit={this.onSeachSubmit} />
                        <View style={{ paddingTop: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch' }}>
                            <Paginator ref={(x) => this._paginator = x}  pageSize={3} items={results} template={<Show onPress={this.openShow} />} />
                        </View>
                    </SelectableContainer>

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