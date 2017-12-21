import React from 'react';
import PaginatorArray from '../common/PaginatorArray';
import { View, StyleSheet, Animated, Easing } from 'react-native'
import { Grid, Row, Col, Button, Icon } from 'native-base';
import { baseOrangeColor } from '../common/constants'
import KeyEvent from 'react-native-key-event'
import { DPAD_FAST_FORWARD, DPAD_FAST_BACKWARD } from '../common/dpadKeyCodes';
import SelectableContainer from '../components/containers/SelectableContainer';
import { Selectable } from '../components/hoc/Selectable';
import PropTypes from 'prop-types';

let fadeValue = new Animated.Value(1);
let slideValue = new Animated.Value(0);

const fadeIn = Animated.timing(fadeValue, {
    duration: 200,
    toValue: 1
});

const fadeOut = Animated.timing(fadeValue, {
    duration: 200,
    toValue: 0
})



export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.__forward = this.__forward.bind(this);
        this.__backward = this.__backward.bind(this);
        this.forwardPage = this.forwardPage.bind(this);
        this.backwardPage = this.backwardPage.bind(this);

        this.state = {
            currentPage: 1,
            fowardPageValue: new Animated.Value(1)
        }
        this.fowardPageValue = new Animated.Value(1);
        this.backwardPageValue = new Animated.Value(0);
        this.fadeValue = new Animated.Value(1);

    }

    static contextTypes = {

        selectFirstElement: PropTypes.func,
        clearSelectables: PropTypes.func
    }

    forwardPage() {
        fadeOut.start(() => {
            this.__forward();
            fadeIn.start();
        })
    }

    backwardPage() {
        fadeOut.start(() => {
            this.__backward();
            fadeIn.start();
        })
    }

    __backward() {
        const { currentPage } = this.state;

        if (currentPage > 1) {
            let newPage = currentPage - 1
            this.setState({ currentPage: newPage });
            this.context.clearSelectables && this.context.clearSelectables();
            //this.context.selectFirstElement();
        }
    }

    __forward() {
        const { currentPage } = this.state;
        const { items } = this.props;
        const pages = new PaginatorArray(items).getTotalPages(this.props.pageSize);

        if (currentPage < pages) {
            const newPage = currentPage + 1;
            this.setState({ currentPage: (newPage) });

            this.context.clearSelectables && this.context.clearSelectables();
            //this.context.selectFirstElement();
        }
    }

    render() {
        const { template: TemplateNode, pageSize, items } = this.props;
        const { currentPage } = this.state;
        const pages = new PaginatorArray(items);

        //const SelectableNode = Selectable(TemplateNode.type)

        return (
            <View style={styles.grid}>
                <View style={styles.backward}  >
                    {currentPage > 1 &&
                        <Button rounded backgroundColor={baseOrangeColor} onPress={this.backwardPage} >
                            <Icon name='md-rewind' />
                        </Button>
                    }
                </View>
                <View style={styles.content} >
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>

                    
                    {/* <Grid> */}

                        {
                            pages.paginate(currentPage, pageSize).map((item, i) =>
                                // <Col key={item.id}>
                                <Animated.View key={item.id} style={{ opacity: fadeValue }}>
                                        <TemplateNode.type {...TemplateNode.props} removable={true} {...item} />
                                    </Animated.View>
                                // </Col>
                            )}

                    {/* </Grid> */}
                    </View>

                </View>
                <View style={styles.forward}>
                    {
                        (pages.getTotalPages(pageSize) > 1) && (currentPage < pages.getTotalPages(pageSize)) &&
                        <Button rounded backgroundColor={baseOrangeColor} style={{ alignSelf: 'flex-end' }} onPress={this.forwardPage} >
                            <Icon name='md-fastforward' />
                        </Button>
                    }
                </View>
            </View>
        )
    }
}





const styles = StyleSheet.create({
    backward: {
        justifyContent: 'center', flex: 10
    },
    forward: {
        flex: 10, justifyContent: 'center'
    },
    content: {
        flex: 80,
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    grid: {
        flex: 1, flexDirection: 'row'
    }
})