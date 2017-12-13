import React from 'react';
import { View, Alert, StyleSheet, StatusBar, Image } from 'react-native';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Text, Content } from 'native-base'
import { DrawerNavigator } from 'react-navigation'
import { BrowseScreen } from '../BrowseScreen/BrowseScreen'
import {Logo} from '../../common/constants'



export default class HomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: (({ tintColor }) => (<Icon style={{ color: tintColor }} name='home'></Icon>))
    }
    constructor(props) {
        super(props);
        this.handleButton = this.handleButton.bind(this);
    }

    handleButton(e) {
        //console.log(e);
        const { navigate } = this.props.navigation;
        Alert.alert('from native');


    }
    render() {

        const { navigate } = this.props.navigation;

        return (


            <Container>
              
                <Content padder style={styles.page}>
                    <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-end'}} >
                        <Image source={Logo}></Image>
                    </View>
                    <Button vertical backgroundColor='#f19d37' onPress={() => {navigate('DrawerOpen')}}>
                        <Icon name='menu'></Icon>
                        <Text>Menu</Text>
                    </Button>
                    <Section title='Favorites'></Section>
                    
                </Content>
            </Container>


        )
    }





}


class Section extends React.Component {
    styles = StyleSheet.create({
        title: {
            fontSize: 24,
            color: 'white'
        },
        main: {
            marginTop: 20,
            padding: 30
        }
    })
    state = {

    }   

    render() {
        const { title } = this.props
        return (
            <View style={this.styles.main}>
                <Text style={this.styles.title}>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#222222'
    },
    page: {
        backgroundColor: '#222222',
        flex: 1,
        

    }
})

