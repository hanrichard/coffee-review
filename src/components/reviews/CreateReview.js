import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createReview} from '../../store/actions/shopsActions'
import {Redirect} from 'react-router-dom'

class CreateReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coffee: 5,
            review: '',
            userid: this.props.userid,
            shopid: this.props.shopid,
            submitted: false,
            loggedin: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.loggedin) {
            this.setState({
                submitted: true,
            })
            this.props.createReview(this.state)
        }
        else {
            alert('login first')
            // this.props.history.push('/signin')
        }
    
        // this.props.history.push('/')
    }

    render() {
        const { auth } = this.props;
        if(auth.uid) {
            this.state.loggedin = true
        }
        else {
            this.state.loggedin = false
        }

        console.log(this.state.loggedin)

        // if(!auth.uid) return <Redirect to='/signin' />
        // console.log(auth.uid)
        if (this.state.submitted) {
            return <h1>thanks for your review</h1>
        } else {
            return (
                <div className="container section">
                    <form className="" onSubmit={this.handleSubmit}>
                        <h5>
                            <b>add a review</b>
                        </h5>

                        <div className="input-file">
                            <label>coffee quality</label>
                            <input
                                required
                                type='number'
                                id="coffee"
                                min="1"
                                max="5"
                                onChange={this.handleChange}/>
                        </div>

                        <div className="input-file">
                            <label>content</label>
                            <textarea
                                required
                                className="materialize-textarea"
                                id="review"
                                onChange={this.handleChange}/>
                        </div>

                        <div className="input-file">
                            <button 
                                className="btn pink" 
                                onClick={this.handleOnClick}
                            >create</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createReview: (review) => dispatch(createReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview)
// export default CreateReview