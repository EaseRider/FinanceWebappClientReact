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
    } = {transactions: [], filterYear: (new Date()).getYear(), filterMonth: (new Date()).getMonth()};

    years: number[] = [2017, 2016, 2015];
    months: string[] = ['Jannuary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    props: Props;

    componentDidMount() {
        this.updateTransactions();
    }


    updateTransactions = () => {
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
                                    <option value="2015">2015</option>
                                    <option value="2016">2016</option>
                                    <option value="2017">2017</option>
                                </select>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width="7">
                        <Form.Field>
                            <label>Select a month</label>
                            <select value={this.state.filterMonth} onChange={this.handleMonthChange}>
                                <option value="0">Jannuary</option>
                                <option value="1">February</option>
                                <option value="2">March</option>
                                <option value="3">April</option>
                                <option value="4">May</option>
                                <option value="5">June</option>
                                <option value="6">July</option>
                                <option value="7">August</option>
                                <option value="8">September</option>
                                <option value="9">October</option>
                                <option value="10">November</option>
                                <option value="11">December</option>
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
                        FormForFilter
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
