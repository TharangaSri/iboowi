import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
//import { routerActions } from 'react-router-redux'

import { loginUser } from '../actions'

export class DoctorLogin extends Component {
    static propTypes = {
        loginUser: PropTypes.func.isRequired,
        errorMessage: PropTypes.string.isRequired,
        isAuthenticated: PropTypes.bool.isRequired
    }


    constructor(props) {
        super(props)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleLoginClick = this.handleLoginClick.bind(this)
    }

    componentWillMount() {
        const { isAuthenticated } = this.props
        if (isAuthenticated) {
            // Redirect to homepage
            browserHistory.push(`/`)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isAuthenticated } = nextProps
        const { isAuthenticated: wasAuthenticated } = this.props

        if (!wasAuthenticated && isAuthenticated) {
            // Redirect to homepage
            browserHistory.push(`/`)
        }
    }

    handleKeyUp(event) {
        if (event.keyCode === 13) {
            this.handleLoginClick(event)
        }
    }

    handleLoginClick(event) {
        event.preventDefault()

        const email = this.refs.email.value 
        const password = this.refs.password.value 
        const creds = { email: email.trim(), password: password.trim() }

        let loginUserPromise = this.props.loginUser(creds)

        // loginUserPromise.then(function (result) {
        //     browserHistory.push(`/`)
        // })
    }

    renderErrorMessage() {
        const { errorMessage } = this.props
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{ fontSize: '13px', color: 'red' }}>
                {errorMessage}
            </p>
        )
    }

    render() {
        return (
            <div className="loginColumns animated fadeInDown">
                <div className="row">

                    <div className="col-md-6">
                        <h2 className="font-bold">Welcome to Pulse33</h2>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                </p>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>

                        <p>
                            When an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>

                        <p>
                            <small>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</small>
                        </p>

                    </div>
                    <div className="col-md-6">
                        <div className="ibox-content">
                            <form className="m-t" role="form" onSubmit={this.handleLoginClick} autoComplete="off">
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Email" required="" ref="email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" required="" ref="password" />
                                </div>
                                <button type="submit" className="btn btn-primary block full-width m-b">Login</button>

                                <a href="#">
                                    <small>Forgot password?</small>
                                </a>

                                {this.renderErrorMessage()}

                                {/*<p className="text-muted text-center">
                                    <small>Do not have an account?</small>
                                </p>
                                <a className="btn btn-sm btn-white btn-block" href="register.html">Create an account</a>*/}
                            </form>
                            <p className="m-t">
                                <small>Pulse33 &copy; 2017</small>
                            </p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        Copyright BeyondiT
            </div>
                    <div className="col-md-6 text-right">
                        <small>© 2016 - 2017</small>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { auth } = state
    const { isAuthenticated, errorMessage } = auth

    return {
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps, {
    loginUser
})(DoctorLogin)
