import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp} from '../../store/actions/authActions'

class Signup extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        this
            .props
            .signUp(this.state)
    }

    render() {
        const {authError, auth} = this.props;
        if (auth.uid) 
            return <Redirect to='/'/>

        return (
            <div className="container">
                <form className="" onSubmit={this.handleSubmit}>
                    <h5>sign up</h5>

                    <div className="input-file">
                        <label>email</label>
                        <input type='email' id="email" onChange={this.handleChange}/>
                    </div>

                    <div className="input-file">
                        <label>password</label>
                        <input type='password' id="password" onChange={this.handleChange}/>
                    </div>

                    <div className="input-file">
                        <label>name</label>
                        <input type='text' id="name" onChange={this.handleChange}/>
                    </div>

                    <div className="input-file">
                        <button className="btn pink">sign up</button>

                        <div>{authError
                                ? <p>{authError}</p>
                                : null}</div>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {auth: state.firebase.auth, authError: state.auth.authError}
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
