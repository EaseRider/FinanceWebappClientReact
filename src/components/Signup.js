// @flow

import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {Button, Segment, Header, Grid, Form, Message} from 'semantic-ui-react'
import ValidatedFormField from './ValidatedFormField'

import {signup} from '../api'

class Signup extends React.Component {

    state: {
        login: string,
        firstname: string,
        lastname: string,
        password: string,
        confirmationPassword: string,
        error: string,
        redirectToReferrer: boolean
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            login: "",
            firstname: "",
            lastname: "",
            password: "",
            confirmationPassword: "",
            error: null,
            redirectToReferrer: false
        };
    };

    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({login: event.target.value})
        }
    };

    handleFirstNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({firstname: event.target.value})
        }
    };

    handleLastNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({lastname: event.target.value})
        }
    };

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({password: event.target.value})
        }
    };

    handleConfirmPasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({confirmationPassword: event.target.value})
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const {login, firstname, lastname, password} = this.state;
        this.errorFixed(() => {
            signup(login, firstname, lastname, password).then(result => {
                this.setState({redirectToReferrer: true, error: null})
            }).catch(error =>
                this.setState({error})
            )
        });
    };

    errorFixed = (callback: any) => {
        let hasErrors = false;
        [
            this.refs.login,
            this.refs.lastname,
            this.refs.firstname,
            this.refs.confirmPw,
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

    defaultValidations = {
        empty: true,
        minLength: 3
    };

    passwordValidations = {
        empty: true,
        equalTo: this.refs.password
    };

    render() {
        const {redirectToReferrer, error} = this.state;

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
                            <Header size="medium">Register</Header>
                            <ValidatedFormField fluid value={this.state.firstname} ref="firstname"
                                                validations={this.defaultValidations} label='First name:'
                                                text="Please specify your first name."
                                                onChange={this.handleFirstNameChanged}/>
                            <ValidatedFormField fluid value={this.state.lastname} ref="lastname"
                                                validations={this.defaultValidations} label='Last name:'
                                                text="Please specify your last name."
                                                onChange={this.handleLastNameChanged}/>
                            <ValidatedFormField fluid value={this.state.login} ref="login"
                                                validations={this.defaultValidations} label='User name:'
                                                text="Please specify your login, at least 3 characters."
                                                onChange={this.handleLoginChanged}/>
                            <ValidatedFormField fluid  value={this.state.password} ref="password"
                                                validations={this.defaultValidations} label='Password:'
                                                text="Please specify your password, at least 3 characters."
                                                onChange={this.handlePasswordChanged} type="password"/>
                            <ValidatedFormField fluid value={this.state.confirmationPassword} ref="confirmPw"
                                                validations={this.passwordValidations} label='Confirm Password:'
                                                text="Please confirm your password."
                                                onChange={this.handleConfirmPasswordChanged} type="password"/>
                            <Form.Field>
                                <Button primary fluid disabled={!(this.state.lastname && this.state.firstname && this.state.password && this.state.confirmationPassword && this.state.login)} onClick={this.handleSubmit}>Account eröffnen</Button>
                            </Form.Field>
                        </Form>
                        { error && <Message attached='bottom' error>Es ist ein Fehler aufgetreten!</Message> }
                    </Segment>

                    <Message attached='bottom' info>
                        Already have an account?&nbsp;
                        <Link to='/login'>Go to login</Link>&nbsp;instead.
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Signup
