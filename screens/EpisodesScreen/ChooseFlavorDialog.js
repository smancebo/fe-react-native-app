import React from 'react';
import { View, Modal } from 'react-native';
import { Browser, Section, Tile } from '../../components/Navigation';
import { Text } from 'native-base'
 

export default class ChooseFlavor extends React.Component {

    render() {
        const { flavors = [] } = this.props;
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.onClose} hardwardAccelerated={true} animationType={'slide'} transparent={false} >
                <Browser>
                    <Section focus={true}>
                        {
                            flavors.map((item, i) => (
                                <Tile key={i}>
                                    <View>
                                        <Text>{item.flavor}</Text>
                                    </View>
                                </Tile>
                            ))
                        }
                    </Section>
                </Browser>
            </Modal>
        )
    }
}