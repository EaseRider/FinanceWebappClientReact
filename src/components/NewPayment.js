// @flow

import React from 'react'
import {Card, Button, Form, FormField, Label, Input, Message, Icon} from 'semantic-ui-react'
import {transfer, getAccountDetails, getAccount} from '../api'
import type {TransferResult} from '../api'
import ValidatedFormField from './ValidatedFormField'

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

    props: Props;

    state: {
        fromAccount: string,
        fromAccountAmount: number,
        toAccount: string,
        toAccountError: string,
        amount: number,
        transaction: TransferResult,
        transactionState: string,
        transactionError: boolean
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            fromAccount: '',
            fromAccountAmount: 0,
            toAccount: '',
            toAccountError: false,
            amount: 0,
            statusError: false,
        };

    }

    componentDidMount() {
        this.updateBalance();
    }

    updateBalance = ()=> {
        getAccountDetails(this.props.token)
            .then(account => {
                this.setState({fromAccount: account.accountNr, fromAccountAmount: account.amount});
            });
    };

    handleNewTransaction = (event: Event) => {
        event.preventDefault();

        const {toAccount, amount} = this.state;

        transfer(toAccount, amount, this.props.token)
            .then(result=> {
                this.setState({
                    transaction: result,
                    toAccount: '',
                    toAccountError: false,
                    amount: '',
                    transactionState: 'Transaction to ' + result.target + ' succeeded. New balance is ' + result.total + ' CHF',
                    transactionError: false
                });
                this.props.cbUpdateTransactions();
                this.updateBalance();
            }).catch((err) => {
            this.setState({transactionState: 'Transaction failed', transactionError: true});
        });
    };

    handleToAccChange = (event: Event) => {
        this.setState({toAccount: event.target.value, transaction: undefined});
    };

    handleAmountChange = (event: Event) => {
        var val = event.target.value;
        if (!isNaN(val) && +val !== Infinity) {
            this.setState({amount: val, transaction: undefined});
        }
    };

    transactionMessage = () => {
        if (this.state.transactionState) {
            return (
                <Message attached='bottom'>
                    <Icon name='info'/><br />
                    <Label basic color={this.state.transactionError ? 'red': 'green'}>{this.state.transactionState}</Label>
                </Message>);
        }
    };

    validateAccountExists = (value: any, callback: Function) => {
        if (value) {
            getAccount(value, this.props.token).then(account => {
                callback(account.owner.firstname + ' ' + account.owner.lastname, 'green', true, false);
            }).catch(account => {
                callback('Not existing account number ' + value, 'red', true, true);
            });
        } else {
            callback('Account number required', 'red', true, true);
        }
    };

    transferAmountValidations = {
        empty: true,
        greaterOrEqualTo: 0.05
    };

    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>New Transaction</Card.Header>
                    <Form onSubmit={this.handleNewTransaction}>
                        <FormField>
                            <Input fluid label='From' placeholder='From' readOnly
                                   value={this.state.fromAccount + ' [Amount: ' + this.state.fromAccountAmount + ' CHF]'}/>
                        </FormField>
                        <ValidatedFormField fluid label='To' placeholder='To' icon='user' value={this.state.toAccount}
                                            onChange={this.handleToAccChange} validations={this.validateAccountExists}
                                            token={this.props.token} ref='toAccount'/>
                        <ValidatedFormField labelPosition={'right'} type={'currency'} fluid placeholder='0.00'
                                            value={this.state.amount} onChange={this.handleAmountChange}
                                            validations={this.transferAmountValidations} token={this.props.token}
                                            ref='transferAmount'>
                            <Label>Amount</Label>
                            <input />
                            <Label basic>CHF</Label>
                        </ValidatedFormField>
                        <Button primary content={'Pay'}/>
                    </Form>
                    {this.transactionMessage()}
                </Card.Content>
            </Card>
        )
    }
}

export default NewPayment
