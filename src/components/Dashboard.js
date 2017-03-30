// @flow

import React from 'react'
import NewPayment from './NewPayment'

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

    return (
      <div>
        This is the dashboarddd
        <NewPayment />
      </div>
    )
  }
}

export default Dashboard
