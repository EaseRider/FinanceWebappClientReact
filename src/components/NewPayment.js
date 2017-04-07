// @flow

import React from 'react'
import {Card, Button, Form} from 'semantic-ui-react'

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

    handleNewTransaction = (event: Event) => {
    }

    render() {

        return (
            <Card>
                <Card.Content>
                    <Card.Header>New Transaction</Card.Header>
                    <Form>
                        <Form.Field>
                            <label>From:</label>
                            <input value={this.state.fromAccount} type="text"/>
                        </Form.Field>
                        <Form.Field>
                            <label>To:</label>
                            <input placeholder="Target Account Number" className="ui input" value={this.state.toAccount} type="text"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Amount [CHF]:</label>
                            <input placeholder="Amount in CHF" className="ui input" value={this.state.amount} type="text"/>
                        </Form.Field>
                        <Button primary onClick={this.handleNewTransaction}>Pay</Button>
                    </Form>
                    This is new Payment!
                </Card.Content>
            </Card>
        )
    }
}

export default NewPayment
