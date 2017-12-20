import React from 'react';
import { StyleSheet, Text, View, ToolbarAndroid, TextInput, AppRegistry } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen/HomeScreen';
import BrowseScreen from './screens/BrowseScreen/BrowseScreen';
import EpisodeScreen from './screens/EpisodesScreen/EpisodeScreen';
import { Drawer as DrawerContent } from './components/DrawerComponent';
import { withLoading } from './components/hoc/withLoading';


import { drawerActiveBackgroundColor, drawerBackgroundColor, drawerInactiveTintColor, drawerActiveTintColor } from './common/constants';



const Main = DrawerNavigator({
  Home: { screen: HomeScreen },
  Browse: { screen: withLoading(BrowseScreen) },
  
}, {
    contentComponent: DrawerContent,
    drawerBackgroundColor: drawerBackgroundColor,
    contentOptions: {
      activeBackgroundColor: drawerActiveBackgroundColor,
      activeTintColor: drawerActiveTintColor,
      inactiveTintColor: drawerInactiveTintColor,

    }
  })

const Navigator = StackNavigator({

  Main: { screen: Main },
  Episodes: { screen: withLoading(EpisodeScreen) }
}, {
    headerMode: 'none',
    animationEnabled: false,
    swipeEnabled: false
  })



export default class App extends React.Component {

  state = {
    fontsLoaded: false
  }
  async componentWillMount() {
    // await Expo.Font.loadAsync({
    //   'Roboto': require('native-base/Fonts/Roboto.ttf'),
    //   'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    // });
    this.setState({ fontsLoaded: true })
  }
  render() {
    const { fontsLoaded } = this.state;
    if (fontsLoaded) {
      return (
        <Navigator />
      )
    }

  }
}

AppRegistry.registerComponent('ikuApp', () => App);

