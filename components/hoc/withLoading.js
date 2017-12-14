import React from 'react';
import Loading from '../../common/Loading'
import {View} from 'react-native';
import {Container} from 'native-base';

export const withLoading = (PassedComponent) => class WithLoading extends React.Component {
    static navigationOptions = PassedComponent.navigationOptions;
    state = {
        loading: false
    }
    render(){
        const {loading} = this.state
        const openDialog = () => {
            this.setState({loading: true});
        }
        const closeDialog = () => {
            this.setState({ loading: false });
        }

        return (
            <Container>
                <Loading visible={loading} onClose={closeDialog} />
                <PassedComponent closeDialog={closeDialog} openDialog={openDialog} {...this.props} />
            </Container>
        )

    } 
}
    
    
