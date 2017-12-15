import React from 'react';
import PaginatorArray from '../common/PaginatorArray';
import { View, StyleSheet } from 'react-native'
import { Grid, Row, Col, Button, Icon } from 'native-base';
import { baseOrangeColor } from '../common/constants'


export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    backward() {

    }

    render() {
        const { templateNode, pageSize, items } = this.props;
        const { currentPage } = this.state;
        const pages = new PaginatorArray(items);

        return (
            <View style={styles.grid}>
                <View style={styles.backward} >
                    { currentPage > 1 && 
                        <Button backgroundColor={baseOrangeColor} >
                            <Icon name='md-rewind' />
                        </Button>
                    }
                </View>
                <View style={styles.content}>
                    <Grid>
                        {pages.paginate(currentPage, pageSize).map((item, i) => <Col key={i}><templateNode {...item} /></Col>)}
                    </Grid>
                </View>
                <View style={styles.forward}>
                   {
                       currentPage < pageSize &&
                        <Button backgroundColor={baseOrangeColor} style={{ alignSelf: 'flex-end' }} >
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
        flex: 80
    },
    grid: {
        flex: 1, flexDirection: 'row'
    }
})