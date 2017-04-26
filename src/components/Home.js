// @flow

import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Container, Segment, Header} from 'semantic-ui-react'

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
            : <Container>
                <Header size="huge">Bank of Catastrophy</Header>
                <Header size="medium">E-Banking Portal</Header>
                <Segment.Group>
                    <Segment>
                        <Link to="/login">
                            <Button primary>Einloggen</Button>
                        </Link>
                    </Segment>
                    <Segment>
                        <p>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
                    </Segment>
                    <Segment>
                        <Link to="/signup">
                            <Button>Registrieren</Button>
                        </Link>
                    </Segment>
                </Segment.Group>
            </Container>
        }
    </div>
)

export default Home
