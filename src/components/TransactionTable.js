// @flow
import React from 'react'
import type {Transaction} from '../api'
import {Table, Button} from 'semantic-ui-react'

import {Link} from 'react-router-dom'

export type Props = {
    token: string,
    transactions: Transaction[],
    isAllTransaction: boolean,
}

class TransactionTable extends React.Component {
    props: Props;

    footer = () => {
        if (!this.props.isAllTransaction) {
            return (
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Link to="/transactions">
                                <Button primary>
                                    All Transactions
                                </Button>
                            </Link>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>);
        }
    }

    columsHeader = () => {
        if (this.props.isAllTransaction) {
            return (
                <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Source</Table.HeaderCell>
                    <Table.HeaderCell>Target</Table.HeaderCell>
                    <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
                    <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
                </Table.Row>);
        } else {
            return (
                <Table.Row>
                    <Table.HeaderCell>Source</Table.HeaderCell>
                    <Table.HeaderCell>Target</Table.HeaderCell>
                    <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
                    <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
                </Table.Row>);
        }
    }

    rows = () => {
        if (this.props.isAllTransaction)
        return this.props.transactions.map((tr, index) =>
                <Table.Row key={index}>
                    <Table.Cell>{tr.date}</Table.Cell>
                    <Table.Cell>{tr.from}</Table.Cell>
                    <Table.Cell>{tr.target}</Table.Cell>
                    <Table.Cell>{tr.amount}</Table.Cell>
                    <Table.Cell>{tr.total}</Table.Cell>
                </Table.Row>
            );
        else
            return this.props.transactions.map((tr, index) =>
                    <Table.Row key={index}>
                        <Table.Cell>{tr.from}</Table.Cell>
                        <Table.Cell>{tr.target}</Table.Cell>
                        <Table.Cell>{tr.amount}</Table.Cell>
                        <Table.Cell>{tr.total}</Table.Cell>
                    </Table.Row>
                );
    }

    render() {
        return (
            <Table celled>
                <Table.Header>
                    {this.columsHeader()}
                </Table.Header>

                <Table.Body>
                    {this.rows()}
                </Table.Body>
                {this.footer()}
            </Table>
        )
    }
}

export default TransactionTable;
