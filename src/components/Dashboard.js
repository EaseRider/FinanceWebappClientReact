// @flow

import React from 'react'
import NewPayment from './NewPayment'
import LastTransactions from './LastTransactions'
import {Card} from 'semantic-ui-react'

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

class Dashboard extends React.Component {

    props: Props

    render() {
        console.log(this.props.token);
        return (
            <Card.Group>
                <NewPayment />
                <LastTransactions token={this.props.token} />
            </Card.Group>
        )
    }
}

export default Dashboard
