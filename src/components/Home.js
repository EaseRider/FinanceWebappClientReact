// @flow

import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Segment, Header, Grid} from 'semantic-ui-react'

export type Props = {
    isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
    <Grid container>
        <Grid.Column>
            { isAuthenticated
                ? <Segment raised>
                    <p>Willkommen zurück!</p>
                    <Link to="/dashboard">
                        <Button primary>Zum Dashboard</Button>
                    </Link>
                </Segment>
                : <Segment raised>
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
                </Segment>
            }
        </Grid.Column>
    </Grid>
)

export default Home
