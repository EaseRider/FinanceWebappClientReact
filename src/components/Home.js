// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <div>
    { isAuthenticated
      ? <div>
          <p>Willkommen zurück!</p>
          <Link to="/dashboard">
            <Button primary>Zum Dashboard</Button>
          </Link>
        </div>
      : <div>
          <Link to="/login">
            <Button primary>Einloggen</Button>
          </Link>
          <p>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
          <Link to="/signup">
            <Button>Registrieren</Button>
          </Link>
        </div>
    }
  </div>
)

export default Home
