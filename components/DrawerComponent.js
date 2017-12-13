import React from 'react';
import {Container, Header, Text, Content, Body, Title} from 'native-base';
import {DrawerItems} from 'react-navigation';
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    bar: {
        backgroundColor: '#222222'
    }
})

export const Drawer = (props) => {
    return (
        <Container>
            <Header style={styles.bar} androidStatusBarColor='#222222'>
                <Body>
                    <Title>iKu</Title>
                </Body>
            </Header>
            <Content>
                <DrawerItems active  {...props}></DrawerItems>
            </Content>
        </Container>
    )
}

