// @flow
import React from 'react'

import type {User} from '../api'
import {getTransactions} from '../api'
import {Card, Divider, Form, Grid} from 'semantic-ui-react'
import TransactionTable from './TransactionTable'

export type Props = {
    token: string,
    user: User,
}

class AllTransactions extends React.Component {
    state: {
        transactions: Transaction[],
        filterYear: number,
        filterMonth: number,
    } = {transactions: [], filterYear: (new Date()).getFullYear(), filterMonth: (new Date()).getMonth()};

    years: number[] = [2017, 2016, 2015];
    months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    props: Props;

    componentDidMount() {
        this.updateTransactions();
    }

    updateTransactions = () => {
        console.log('UpdateTransactions', this.state.filterYear, this.state.filterMonth);
        let start = new Date(Date.UTC(this.state.filterYear, this.state.filterMonth, 1));
        let end = new Date(Date.UTC(this.state.filterYear, this.state.filterMonth + 1, 0, 23, 59, 59, 999));
        getTransactions(this.props.token, start.toJSON(), end.toJSON(), 0, 0).then(({result, query}) => {
            this.setState({transactions: result});
        }).catch((error) => {
            this.setState({transactions: []});
        });
    };
    handleYearChange = (event: Event) => {
        this.setState({filterYear: +event.target.value}, () => this.updateTransactions());
        //this.updateTransactions();
    };
    handleMonthChange = (event: Event) => {
        this.setState({filterMonth: +event.target.value}, () => this.updateTransactions());
        //this.updateTransactions();
    };

    filterform = () => {
        return (
            <Form onSubmit={this.handleNewTransaction}>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width="3">
                            <Form.Field>
                                <label>Select a year</label>
                                <select value={this.state.filterYear} onChange={this.handleYearChange}>
                                    {
                                        this.years.map((year, index) =>
                                            (<option value={year} key={year}>{year}</option>))
                                    }
                                </select>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width="7">
                        <Form.Field>
                            <label>Select a month</label>
                            <select value={this.state.filterMonth} onChange={this.handleMonthChange}>
                                {
                                    this.months.map((month, index) =>
                                        (<option value={index} key={index}>{month}</option>))
                                }
                            </select>
                        </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>);
    };

    render() {
        return (
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            <h1>All Transactions</h1>
                            {this.state.filterMonth} - {this.state.filterYear}
                        </Card.Header>
                        <Divider></Divider>
                        <Card.Header>Filter</Card.Header>
                        {this.filterform()}
                    </Card.Content>
                    <Card.Content>
                        <TransactionTable transactions={this.state.transactions} isAllTransaction={true}/>
                    </Card.Content>
                </Card>
            </Card.Group>
        )
    };
}

export default AllTransactions;
