import React from 'react';
import PropTypes from 'prop-types'
import { View, StyleSheet, Animated } from 'react-native';




export const Selectable = (WrappedComponent) => class withSelectable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registered: false,
            isFocus: false
        }
        this.onLayout = this.onLayout.bind(this);
        this.onPress = this.onPress.bind(this);
        this._handleFocus = this._handleFocus.bind(this);
        this._handleBlur = this._handleBlur.bind(this);
        this.scaleValue = new Animated.Value(1);
        this.SelectElement = (cb) => {
            this.scaleValue.setValue(1)
            Animated.timing(this.scaleValue, {
                toValue: 1.1,
                duration: 200
            }).start(() => {
                if (cb) cb();
            });
        }
        this.DeSelectElement = (cb) => {
            this.scaleValue.setValue(1.1);
            Animated.timing(this.scaleValue, {
                toValue: 1,
                duration: 200
            }).start(() => {
                if (cb) cb();
            })
        }
    }

    static contextTypes = {
        registerSelectable: PropTypes.func,
        selectFirstElement: PropTypes.func
    }

    onLayout(e) {
        if (this.state.registered) {
            return;
        }
        const { layout } = e.nativeEvent;
        this.context.registerSelectable({
            x: layout.x,
            y: layout.y,
            onFocus: this._handleFocus,
            onBlur: this._handleBlur,
            onPress: this.onPress
        });

        if (this.props.onLayout) {
            this.props.onLayout();
        }
        this.setState({ registered: true })

    }

    onPress() {
        const { onPress = () => { } } = this.props;
        onPress();
    }
    _handleFocus(callback) {
        const { onFocus } = this.props;
        this.setState({ isFocus: true });
        this.SelectElement(callback);
        if (onFocus) {
            onFocus();
        }
    }
    _handleBlur(callback) {
        const { onBlur } = this.props;
        this.setState({ isFocus: false })
        this.DeSelectElement(callback);
        if (onBlur) {
            onBlur()
        }
    }

    render() {
        const { isFocus } = this.state;
        return (
            <Animated.View style={[this.props.style, isFocus === true ? {transform: [{scaleX: this.scaleValue}, {scaleY: this.scaleValue}]} : {}]}>
                <WrappedComponent style={[this.props.style]} onLayout={this.onLayout} {... this.props} />
            </Animated.View>
        )
    }


}

const styles = StyleSheet.create({
    active: {
        opacity: .8,
        
    }
})

