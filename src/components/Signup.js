// @flow

import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {Button, Segment, Header, Grid, Form, Message} from 'semantic-ui-react'

import {signup} from '../api'

class Signup extends React.Component {

    state: {
        login: string,
        firstname: string,
        lastname: string,
        password: string,
        error: string,
        redirectToReferrer: boolean,
    }

    state = {
        login: "",
        firstname: "",
        lastname: "",
        password: "",
        error: null,
        redirectToReferrer: false,
    }

    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({login: event.target.value})
        }
    }

    handleFirstNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({firstname: event.target.value})
        }
    }

    handleLastNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({lastname: event.target.value})
        }
    }

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({password: event.target.value})
        }
    }

    handleSubmit = (event: Event) => {
        event.preventDefault()
        const {login, firstname, lastname, password} = this.state
        signup(login, firstname, lastname, password).then(result => {
            console.log("Signup result ", result)
            this.setState({redirectToReferrer: true, error: null})
        }).catch(error =>
            this.setState({error})
        )
    }

    render() {
        const {redirectToReferrer, error} = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to='/login'/>
            )
        }

        return (
            <Grid container>
                <Grid.Column>
                    <Segment raised>
                        <Header size="huge">Bank of Rapperswil</Header>
                        <Form>
                            <Header size="medium">Registrieren</Header>
                            <input onChange={this.handleLoginChanged} placeholder='Login' value={this.state.login}/>
                            <input onChange={this.handleFirstNameChanged} placeholder='Vorname'
                                   value={this.state.firstname}/>
                            <input onChange={this.handleLastNameChanged} placeholder='Nachname'
                                   value={this.state.lastname}/>
                            <input onChange={this.handlePasswordChanged} placeholder='Passwort' type="password"
                                   value={this.state.password}/>
                            <Button onClick={this.handleSubmit}>Account eröffnen</Button>
                        </Form>
                        { error && <p>Es ist ein Fehler aufgetreten!</p> }
                    </Segment>

                    <Message attached='bottom' info>
                        Already have an account?&nbsp;<Link to='/login'>
                        <Button size="small" compact>Login here</Button>
                    </Link>&nbsp;instead.
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Signup
