import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Content } from '../../components/Navigation';
import Background from '../../components/Background';
import { Container, Text } from 'native-base';
import ConfigOptionTile from '../ConfigScreen/ConfigOptionTile';
import { baseOrangeColor } from '../../common/constants';
import List from '../../components/List';
const Items = [
    'JkAnime',
    'Anime FLV'
]
export default class MediaSourceScreen extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <Background />
                    <View style={{ height: '100%', flexDirection: 'row' }}>
                        <View style={styles.leftPane} >
                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <View style={{flexDirection: 'row', paddingRight: 20}}>
                                    <View style={{flexDirection: 'column', paddingRight: 20, justifyContent: 'center'}}>
                                        <Text style={{color: baseOrangeColor, textAlign: 'right', fontSize: 20}}>Settings</Text>
                                        <Text style={{color: 'white', fontSize: 40}}>Media Source</Text>
                                    </View>
                                    <ConfigOptionTile icon='cloud-sync' style={{width: 130, height: 130}} focus={true} iconStyle={{fontSize: 100}} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.rightPane}>
                            <List items={Items} />
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    leftPane: {
        flex: 60
    },
    rightPane: {
        flex: 40,
        backgroundColor: '#101010',
        flexDirection: 'column',
        
    
        
        
    },
    menuItem: {
        padding: 20
    },
    menuItemText: { color: 'white', fontSize: 20 },
    menuItemSelected: {
        backgroundColor: '#1d1d1d'
    }
})