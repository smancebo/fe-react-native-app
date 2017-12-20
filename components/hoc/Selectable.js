import React from 'react';
import PropTypes from 'prop-types'
import { View, StyleSheet, Animated } from 'react-native';




export const Selectable = (WrappedComponent) => class withSelectable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registered: false,
            isFocus: false,
            target: 0
        }
        this.onLayout = this.onLayout.bind(this);
        this.onPress = this.onPress.bind(this);
        this._handleFocus = this._handleFocus.bind(this);
        this._handleBlur = this._handleBlur.bind(this);
       
    }

    componentWillUnmount() {
        //  this.context.unRegisterSelectable(this.state.target)
    }

    static contextTypes = {
        registerSelectable: PropTypes.func,
        selectFirstElement: PropTypes.func,
        unRegisterSelectable: PropTypes.func
    }

    onLayout(e) {
        if (this.state.registered) {
            return;
        }
        const { layout } = e.nativeEvent;
        const target = e.nativeEvent.target;
        this.refs.wrappedComponent._self.measure((x, y, w, h ,px, py) => {
            if (this.context.registerSelectable) {


                this.context.registerSelectable({
                    x: px,
                    y: py,
                    onFocus: this._handleFocus,
                    onBlur: this._handleBlur,
                    onPress: this.onPress,
                    props: this.props,
                    target: target,
                    removable: this.props.removable || false
                });

                if (this.props.onLayout) {
                    this.props.onLayout();
                }
                this.setState({ registered: true, target: target })
            }
        })
        

    }

    onPress() {
        const { onPress = () => { } } = this.props;
        onPress(this.props);
    }
    _handleFocus(callback) {
        const { onFocus } = this.props;
        this.setState({ isFocus: true });
        // this.SelectElement(callback);
        if (onFocus) {
            onFocus();
        }
    }
    _handleBlur(callback) {
        const { onBlur } = this.props;
        this.setState({ isFocus: false })
        // this.DeSelectElement(callback);
        if (onBlur) {
            onBlur()
        }
    }

    render() {
        const { isFocus } = this.state;
        return (
            <View>
                <WrappedComponent isFocus={isFocus} ref="wrappedComponent" style={[this.props.style]} onLayout={this.onLayout} {... this.props} />
            </View>
        )
    }


}

const styles = StyleSheet.create({
    active: {
        opacity: .8,

    }
})

