// @flow

import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {Form, Message, Button, Grid, Segment, Header} from 'semantic-ui-react'
import ValidatedFormField from './ValidatedFormField'

export type Props = {
    /* Callback to submit an authentication request to the server */
    authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
    /* We need to know what page the user tried to access so we can
     redirect after logging in */
    location: {
        state?: {

            from: string,
        }
    }
}

class Login extends React.Component {

    props: Props;

    state: {
        login: string,
        password: string,
        error?: Error,
        redirectToReferrer: boolean
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            error: undefined,
            redirectToReferrer: false
        };
    };
    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({login: event.target.value})
        }
    };

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({password: event.target.value})
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const {login, password} = this.state;
        this.errorFixed(() => {
            this.props.authenticate(login, password, (error) => {
                if (error) {
                    this.setState({error})
                } else {
                    this.setState({redirectToReferrer: true, error: null})
                }
            })
        });
    };

    errorFixed = (callback: any) => {
        let hasErrors = false;
        [
            this.refs.login,
            this.refs.password
        ].forEach(function (field) {
            if (field.executeValidation(field.props.value)) {
                hasErrors = true;
            }
        });
        if (hasErrors !== true) {
            callback();
        }
    };

    loginValidations = {
        empty: true,
        minLength: 3
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/dashboard'}};
        const {redirectToReferrer, error} = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <Grid container>
                <Grid.Column>
                    <Segment raised>
                        <Header size="large">Bank of Rapperswil</Header>
                        <Form onSubmit={this.handleSubmit}>
                            <Header size="medium">Login</Header>
                            <ValidatedFormField fluid value={this.state.login} ref="login"
                                                validations={this.loginValidations} label='Login'
                                                text="Please specify your login, at least three characters."
                                                onChange={this.handleLoginChanged}/>

                            <ValidatedFormField fluid value={this.state.password} ref="password"
                                                validations={this.loginValidations} label='Password'
                                                type="password"
                                                text="Please specify your password, at least three characters."
                                                onChange={this.handlePasswordChanged}/>
                            <Form.Field>
                                <Button primary fluid disabled={!(this.state.password && this.state.login)} type='submit'>Log-in</Button>
                            </Form.Field>
                        </Form>
                        {error && <Message attached='bottom' error>Es ist ein Fehler aufgetreten!</Message> }
                    </Segment>
                    <Message attached='bottom' info>
                        Not registered yet?&nbsp;<Link to="/signup">Signup here</Link>&nbsp;instead.
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login
