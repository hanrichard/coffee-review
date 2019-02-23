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
            userid: 'YgXNhVSeD9b7NJaAiLAQZRoPpac2',
            shopid: this.props.shopid,
            submitted: false
        }
    }

    handleChange = (e) => {
        this.setState({
            coffee: parseInt(this.state.coffee),
            review: this.state.review
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({submitted: true})
        this
            .props
            .createReview(this.state)
        // this.props.history.push('/')
        console.log(this.state)
    }

    render() {
        const {auth, shop, shopid} = this.props;
        // if(!auth.uid) return <Redirect to='/signin' />

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
                            <button className="btn pink">create</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        // auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createReview: (review) => dispatch(createReview(review))
    }
}

export default connect(null, mapDispatchToProps)(CreateReview)
// export default CreateReview