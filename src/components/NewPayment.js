// @flow

import React from 'react'

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
}

class NewPayment extends React.Component {

    state: {
        fromAccount: string,
        toAccount: string,
        amount: number
    } = {};
    props: Props

    render() {

        return (
            <div>
                <h1>New Transaction</h1>
                <input value={this.state.fromAccount} type="text"/>
                <input value={this.state.toAccount} type="text"/>
                <input value={this.state.amount} type="text"/>
                <button>Pay</button>
                This is new Payment!
            </div>
        )
    }
}

export default NewPayment
