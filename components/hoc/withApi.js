import React from 'react';
import { config } from '../../config';

export const withApi = (PassedComponent) => {
    return <PassedComponent apiUrl={config.API} {...this.props} />
} 