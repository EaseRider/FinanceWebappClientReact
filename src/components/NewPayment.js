// @flow

import React from 'react'
import {Card, Button, Form, Message, Icon} from 'semantic-ui-react'
import {transfer, getAccountDetails} from '../api'
import type {TransferResult} from '../api'

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
    cbUpdateTransactions: () => void,
}

class NewPayment extends React.Component {

    state: {
        toAccount: string,
        amount: number,
        transaction: TransferResult,
        actualBalance: number
    } = {toAccount: '', amount: '', transaction: undefined, actualBalance: ''};
    props: Props

    componentDidMount() {
        this.updateBalance();
    }

    updateBalance() {
        getAccountDetails(this.props.token)
            .then((result: any) => {
                this.setState({actualBalance: result.amount});
            });
    }

    handleNewTransaction = (event: Event) => {
        transfer(this.state.toAccount, +this.state.amount, this.props.token)
            .then((result, query) => {
                this.setState({transaction: result});
                this.props.cbUpdateTransactions();
                this.updateBalance();
            }).catch((err) => {
            console.log('Error on Transfer: ', err);
        });
        event.preventDefault();
    }
    handleToAccChange = (event: Event) => {
        this.setState({toAccount: event.target.value, transaction: undefined});
    }
    handleAmountChange = (event: Event) => {
        var val = event.target.value;
        if (!isNaN(val) && +val !== Infinity) {
            this.setState({amount: val, transaction: undefined});
        }
    }

    transactionMessage = () => {
        if (this.state.transaction) {
            return (
                <Message attached='bottom'>
                    <Icon name='info'/><br />
                    Transaction to {this.state.transaction.target}
                    succeeded! New balance is {this.state.transaction.total} CHF
                </Message>);
        }
    }

    fromAccount = () => {
        let amount = this.state.actualBalance ? parseFloat(this.state.actualBalance).toFixed(2) : this.state.actualBalance;
        return this.props.user.accountNr + ' [' + amount + ' CHF]';
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>New Transaction</Card.Header>
                    <Form onSubmit={this.handleNewTransaction}>
                        <Form.Field>
                            <label>From:</label>
                            <input value={this.fromAccount()} disabled type="text"/>
                        </Form.Field>
                        <Form.Field>
                            <label>To:</label>
                            <input placeholder="Target Account Number" value={this.state.toAccount}
                                   onChange={this.handleToAccChange} type="text"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Amount [CHF]:</label>
                            <input placeholder="Amount in CHF" value={this.state.amount}
                                   onChange={this.handleAmountChange} type="text"/>
                        </Form.Field>
                        <Button primary type='submit'>Pay</Button>
                    </Form>
                    {this.transactionMessage()}
                </Card.Content>
            </Card>
        )
    }
}

export default NewPayment
