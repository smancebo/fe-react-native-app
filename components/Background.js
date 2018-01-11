import React from 'react';
import {View, Image} from 'react-native';
import { backgroundImage } from '../common/constants';

const Background = (props) => {
    return (
        <View style={{ width: '100%', height: '100%', position: 'absolute', opacity: .2 }}>
            <Image source={backgroundImage} resizeMode='stretch' style={{ width: '100%', height: '100%' }} />
        </View>
    )
}
export default Background