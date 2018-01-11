import React from 'react';
import { Modal, View, ProgressBarAndroid} from 'react-native';
import FadeView from './FadeView';
import { baseOrangeColor } from '../../common/constants';


const BufferingOverlay = (props) => {
    const {visible} = props;
    const fade = visible ? 'in' : 'out';

    return(
       
        <FadeView fade={fade} style={{width: '100%', height: '100%', zIndex: 1, position: 'absolute'}} >
            <View style={{ position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', zIndex: 1 }}>
                <View style={{ backgroundColor: '#222222', padding: 5, opacity: .8, borderRadius: 5 }}>
                    <ProgressBarAndroid indeterminate={true} color={baseOrangeColor}  />
                </View>
            </View>
        </FadeView>
        
    )
}

module.exports = BufferingOverlay;