import React from 'react';
import SelectableContainer from '../containers/SelectableContainer';

export const selectableContainer = (WrappedComponent) => class withSelectableContainer extends React.Component {
    render(){
        return (
            <SelectableContainer>
                <WrappedComponent  {...this.props} />
            </SelectableContainer>
        )
    }
}
