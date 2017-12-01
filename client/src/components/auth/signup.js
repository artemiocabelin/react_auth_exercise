import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Signup extends Component {
    renderField(field) {
        return (
            <div>
                <input {...field.input} type={field.type} className="form-control" />
                {field.meta.touched && <span className="error">{field.meta.error}</span>}
            </div>
        )
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }
    
    handleFormSubmit(values) {
        this.props.signupUser(values)
    }
    
    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field name="email" type="text" className="form-control" component={this.renderField} />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field name="password" type="password" className="form-control" component={this.renderField} />
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <Field name="passwordConfirm" type="password" className="form-control" component={this.renderField} />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        )
    }
}

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate(values) {
    const errors = {}
    if (!values.email || !validateEmail(values.email)) {
        errors.email = "Enter a valid email!";
    }
    if (!values.password || values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match'
    }
    
    return errors
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error }
}

export default connect(mapStateToProps, actions)(
        reduxForm({
            form: 'signup',
            validate,
            fields: ['email', 'password', 'passwordConfirm']
        })(Signup)
    )