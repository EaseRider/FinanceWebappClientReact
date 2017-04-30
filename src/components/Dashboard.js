// @flow

import React from 'react'
import NewPayment from './NewPayment'
import TransactionTable from './TransactionTable'
import {Grid, Header, Segment} from 'semantic-ui-react'
import type {User, Transaction} from '../api'

import {getTransactions} from '../api'
/*
 Use the api functions to call the API server. For example, the transactions
 can be retrieved and stored in the state as follows:

 getTransactions(this.props.token)
 .then(({result: transactions}) =>
 this.setState({transactions})
 )

 import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'
 */

export type Props = {
    token: string,
    user: User,
}

class Dashboard extends React.Component {
    state: {
        transactions: Transaction[],
    } = {transactions: []};
    props: Props;
    // callback für NewPayment
    // state with transactions for TransactionTable
    componentDidMount() {
        this.updateTransactions();
    }

    updateTransactions = () => {
        getTransactions(this.props.token, '1999-05-11T02:00:00.000Z', (new Date()).toISOString(), 3, 0).then(({result, query}) => {
            this.setState({transactions: result});
        });
    }

    render() {
        return (
            <Grid stackable container columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Segment raised>
                            <NewPayment user={this.props.user} token={this.props.token}
                                        cbUpdateTransactions={this.updateTransactions}/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment raised>
                            <Header size="medium">Last Transactions</Header>
                            <TransactionTable transactions={this.state.transactions} isAllTransaction={false}/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        )
    }
}

export default Dashboard
