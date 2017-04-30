/**
 * Created by jengeler on 30.04.2017.
 */
import React from 'react'
import {Input, FormField, Label} from 'semantic-ui-react'

export type Props = {
    validations: any,
}

class ValidatedFormField extends React.Component {
    props: Props;

    state : {
        value: any,
        message: string,
        color: string,
        isWrong: boolean,
        validated: boolean
    } = {color: 'red'};

    validateMinimumLength = (value: any, length: number) => {
        if(value.length < length){
            this.setState({message: 'should have more than ' + length+ ' characters'});
        }
        return true;
    };

    validateEquality = (value: any, other: any) => {
        if(value !== other.props.value){
            this.setState({message: 'should be equal to '+ other.props.label});
            return false;
        }
        return true;
    };

    validateGreaterOrEqual = (value: number, other: number) => {
        if(value < other){
            this.setState({message: 'should be greater or equal to '+ other});
            return false;
        }
        return true;
    };

    validateValue = (value: any) => {
        if(value === ""){
            this.setState({message: 'should not be empty'});
            return false;
        }
        return true;
    };

    clearMessage = () => {
        this.setState({message: ''});
    };

    executeValidation = (value: any) => {
        var isWrong = false;
        this.clearMessage();

        const {validations} = this.props;
        if(validations){
            Object.keys(validations).forEach(function (key) {
                if(key === 'empty' && validations[key] === true){
                    if(!this.validateValue(value)){
                        isWrong = true;
                    }
                }

                if(key === 'minLength'){
                    if(!this.validateMinimumLength(value, validations[key])){
                        isWrong = true;
                    }
                }

                if(key === 'equal' && validations[key] !== undefined){
                    if(!this.validateEquality(value, validations[key])){
                        isWrong = true;
                    }
                }

                if(key === 'greaterOrEqual' && validations[key] !== undefined){
                    if(!this.validateGreaterOrEqual(value, validations[key])){
                        isWrong = true;
                    }
                }
            }, this);
        }

        this.setState({validated: true, isWrong: isWrong});
    };

    validationCallback = (message: string, color: string, isWrong: boolean, validated: boolean) => {
        this.setState({validated: validated, isWrong: isWrong, message: message, color: color});
    };

    validate = (value: any) => {
        if (typeof this.props.validations === "function") {
            this.props.validations(value, this.validationCallback);
        } else {
            this.executeValidation(value);
        }
    };

    hasError = () => {
        if(!this.state.validated){
            this.validate(this.state.value);
        }

        return this.state.isWrong;
    };

    handleOnChange = (event: Event) => {
        if(event.target instanceof HTMLInputElement){
            this.setState({value: event.target.value});
            this.validate(event.target.value);

            if(this.props.onChange){
                this.props.onChange(event);
            }
        }

        return true;
    };

    render() {
        const {onChange, validations, fluid, token, ...props} = this.props;
        return (
            <FormField>
                <Input {...props} onChange={this.handleOnChange}
                                  error={Boolean(this.state.validated && this.state.isWrong)}/>
                {
                    this.state.message && (this.state.color ?
                            <Label basic pointing color={this.state.color} content={this.state.message}/>
                            :
                            <Label basic pointing content={this.state.message}/>
                    )
                }
            </FormField>
        )
    }
}

export default ValidatedFormField