import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createReview} from '../../store/actions/shopsActions'
import {Redirect} from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';

class CreateReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coffee: 0,
            review: '',
            userid: this.props.userid,
            shopid: this.props.shopid,
            submitted: false,
            loggedin: false
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({coffee: nextValue});
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.loggedin) {
            this.setState({submitted: true})
            this
                .props
                .createReview(this.state)
        } else {
            alert('login first')
            // this.props.history.push('/signin')
        }

        // this.props.history.push('/')
    }

    render() {
        const {auth} = this.props;
        if (auth.uid) {
            this.state.loggedin = true
        } else {
            this.state.loggedin = false
        }

        console.log(this.state.loggedin)

        // if(!auth.uid) return <Redirect to='/signin' /> console.log(auth.uid)
        if (this.state.submitted) {
            return <h1>thanks for your review</h1>
        } else {
            return (
                <div className="card">
                    <form className="card-content" onSubmit={this.handleSubmit}>
                        <h5>
                            Write a review for <b> {this.props.shopname} </b>
                        </h5>

                        <div className="input-file">

                        <div className="StarRatingComponent-wrapper">
                            <label>coffee quality </label>
                            <StarRatingComponent
                                className="StarRatingComponent"
                                name="rate1"
                                starCount={5}
                                value={this.state.coffee}
                                onStarClick={this.onStarClick.bind(this)}/>
                                </div>
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
                            <button className="btn pink" onClick={this.handleOnClick}>create</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {auth: state.firebase.auth}
}

const mapDispatchToProps = dispatch => {
    return {
        createReview: (review) => dispatch(createReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview)
