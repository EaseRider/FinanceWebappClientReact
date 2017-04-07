// @flow

import React from 'react'
import NewPayment from './NewPayment'
import TransactionTable from './TransactionTable'
import {Card} from 'semantic-ui-react'
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
            <Card.Group itemsPerRow="2">
                <NewPayment user={this.props.user} token={this.props.token}
                            cbUpdateTransactions={this.updateTransactions}/>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Last Transactions</Card.Header>
                        <TransactionTable transactions={this.state.transactions} isAllTransaction={false}/>
                    </Card.Content>
                </Card>
            </Card.Group>
        )
    }
}

export default Dashboard
