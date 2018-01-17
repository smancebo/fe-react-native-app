import React from 'react';
import Browser from './Browser';
import Section from './Section';
import Tile from './Tile';
import { Content } from 'native-base'

const c = (props) => {
    return (
        <Content style={{ backgroundColor: '#000000', flex: 1 }} contentContainerStyle={{ height: '100%' }}>
            {props.children}
        </Content>
    )
} 
export {
    Browser,
    Section, 
    Tile,
    c as Content
}

