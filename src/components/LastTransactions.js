// @flow
import React from 'react'
import {getTransactions} from '../api'
import type {Transaction} from '../api'
import {Card, Table} from 'semantic-ui-react'


export type Props = {
    token: string,
}

class LastTransactions extends React.Component {
    state: {
        transactions: Transaction[],
    }

    state = {
        transactions: [],
    }

    componentDidMount() {
        getTransactions(this.props.token, '1999-05-11T02:00:00.000Z', (new Date()).toISOString(), 3, 0).then(({result, query}) => {
            console.log(result, query);
            this.setState({transactions: result});
        });
    }

    props: Props

    gotoAllTransactions = (event: Event) => {
    }

    render() {

        return (
            <Card>
                <Card.Content>
                    <Card.Header>Last Transactions</Card.Header>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Source</Table.HeaderCell>
                                <Table.HeaderCell>Target</Table.HeaderCell>
                                <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
                                <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.transactions.map((tr, index) =>
                                <Table.Row key={index}>
                                    <Table.Cell>{tr.from}</Table.Cell>
                                    <Table.Cell>{tr.target}</Table.Cell>
                                    <Table.Cell>{tr.amount}</Table.Cell>
                                    <Table.Cell>{tr.total}</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <button className="ui primary button" onClick={this.gotoAllTransactions}>
                                        All Transactions
                                    </button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Card.Content>
            </Card>
        )
    }
}

export default LastTransactions
