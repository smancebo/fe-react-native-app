import React from 'react';
import { Text, View, TextInput, ScrollView, Alert, StyleSheet, Modal, ProgressBarAndroid } from 'react-native';
import { Icon, Container, Content, Grid, Col } from 'native-base'
import { globalStyles } from '../../common/styles';
import SearchBox from './SearchBox';
import Service from '../../common/api/service';
import { Show } from '../../components/Show';
import PaginatorArray from '../../common/PaginatorArray';


const a = new Array(100).fill('');
class BrowseScreen extends React.Component {

    constructor(props) {
        super(props)
        this.onSeachSubmit = this.onSeachSubmit.bind(this);
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
        const { data: results } = await Service.Search(text);
        this.setState({ results })
        this.props.closeDialog();
    }

    componentDidMount() {

    }



    render() {
        const { results } = this.state;
        const pages = new PaginatorArray(results);
        
        return (
            <Container>

                <Content style={globalStyles.page} padder >
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <SearchBox onSubmit={this.onSeachSubmit} />
                            </View>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Icon name='md-search' style={{ color: 'white' }}></Icon>
                            </View>
    
                        </View>
                        <View style={{paddingTop:20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 3 }}>
                            <Grid>
                                <Col size={10}>
                                
                                </Col>
                                <Col size={80} style={{}}>
                                    <Grid>
                                        {pages.paginate(1, 3).map((show) => <Col key={show.id}><Show title={show.title} image={show.image} link={show.link} /></Col>)}
                                    </Grid>
                                </Col>
                                <Col size={10}>
                                </Col>
                            </Grid>
                        </View>
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