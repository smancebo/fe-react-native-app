import React from 'react';
import {View} from 'react-native';
import { Container } from 'native-base';
import {Browser, Section, Tile, Content} from '../../components/Navigation';
import Background from '../../components/Background';
import ConfigOptionTile from './ConfigOptionTile';


export default class ConfigScreen extends React.Component{

    constructor(props){
        super(props);
        this.openChooseMedia = this.openChooseMedia.bind(this);
    }
    openChooseMedia(){
        const {navigate} = this.props.navigation;
        navigate('MediaSource')
    }
    render(){
       return (
           <Container>
               <Content>
                   <Background />
                   <Browser>
                       <Section scrollValue={400} offsetElement={1} focus={true} title="Settings">
                           <ConfigOptionTile focus={true} text="Accounts" icon="account-settings-variant" />
                           <ConfigOptionTile text="Media Source" icon="cloud-sync" onPress={this.openChooseMedia} />
                           <ConfigOptionTile text="Logout" icon="logout" />
                       </Section>
                   </Browser>
               </Content>
           </Container>
       )
    }

}