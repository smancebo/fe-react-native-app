import React from 'react';
import {View} from 'react-native';
import { Container } from 'native-base';
import {Browser, Section, Tile, Content} from '../../components/Navigation';
import Background from '../../components/Background';
import ConfigOptionTile from './ConfigOptionTile';


export default class ConfigScreen extends React.Component{

    render(){
       return (
           <Container>
               <Content>
                   <Background />
                   <Browser>
                       <Section scrollValue={400} offsetElement={1}  focus={true} title="Configuration">
                           <ConfigOptionTile focus={true} text="Accounts" icon="account-settings-variant" />
                           <ConfigOptionTile text="Media Source" icon="cloud-sync" />
                           <ConfigOptionTile text="Logout" icon="logout" />
                       </Section>
                   </Browser>
               </Content>
           </Container>
       )
    }

}