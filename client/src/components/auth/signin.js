import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'
import { connect } from 'react-redux'

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password })
    }
    
    renderAlert() {
        if(this.props.errorMassage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMassage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit, fields: { email, password }} = this.props

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field name="email" type="text" className="form-control" component="input" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field name="password" type="password" className="form-control" component="input" />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign In</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return { errorMassage: state.auth.error }
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password'],
})(
    connect(mapStateToProps, actions)(Signin)
)