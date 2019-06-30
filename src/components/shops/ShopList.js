import React, {Component} from 'react';
import ShopSummary from './ShopSummary';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    select {
        margin-top: 10px;
        display: block;
    }

    .shops__show-results {
        display: flex;
        align-items: center;
         
        label {
            color: #000000;
            font-weight: bold;
            flex: 1 1 200px;
        }
    }
`   

class ShopList extends Component {
    state = {
        value: 'highest scores',
        reviewsNumber: 1,
        reviewsAmount: 0
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleReviewNumberChange = (event) => {
        this.setState({reviewsNumber: event.target.value});
    }

    handleReviewAmountChange = (event) => {
        this.setState({reviewsAmount: event.target.value});
    }


    render() {
        const sortoptions = [
            'highest scores',
            'lowest scores',
            'most reviews',
            'lowest reviews'
        ]

        const sortReviewNumberoptions = [
            '1', '2', '3', '4', '5'
        ]

        const sortReviewAmountroptions = [
            '1', '2', '3', '5'
        ]


        const { shops, reviews, suburb } = this.props;

        if(shops) {
            shops.map(shop => {
                if (reviews) {
                    const relativeReviews = reviews.filter(review => review.shopid === shop.id)
                    const relativeReviewsTotal = relativeReviews.reduce(function (accumulator, review) {
                        return accumulator + parseInt(review.coffee);
                    }, 0)
                    const relativeReviewsNumber = relativeReviews.length
                    const average =  parseFloat(relativeReviewsTotal / relativeReviewsNumber).toFixed(1)
                    shop.average = average;
                    shop.relativeReviewsNumber = relativeReviewsNumber;
                }
            })
        }

        const renderShop = () => {
            let newshops = shops;

            if (this.state.value === sortoptions[0]) {
                newshops = shops && shops.sort((a,b) => a.average < b.average)
            } else if (this.state.value === sortoptions[1]) {
                newshops = shops && shops.sort((a,b) => a.average > b.average)
            } else if (this.state.value === sortoptions[2]) {
                newshops = shops && shops.sort((a,b) => a.relativeReviewsNumber < b.relativeReviewsNumber)
            } else if (this.state.value === sortoptions[3]) {
                newshops = shops && shops.sort((a,b) => a.relativeReviewsNumber > b.relativeReviewsNumber)
            }

            return (
                shops && newshops
                .filter( shop => shop.average > this.state.reviewsNumber )
                .filter( shop => shop.relativeReviewsNumber > this.state.reviewsAmount )
                .map(shop => {
                    return (
                        <div key={shop.id} >
                            <Link to={suburb + '/' + shop.id} >
                                <ShopSummary 
                                    shop={shop} 
                                    reviews={reviews}
                                    relativeReviewsNumber={shop.relativeReviewsNumber}
                                    average={shop.average}
                                /> 
                            </Link>
                        </div>
                        )   
                    }
                )
            )
        }
        
        return (
            <Wrapper>
                <label>Sort by: </label>
                <select 
                    className="shopsort"
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    { sortoptions.map((option, index) => {
                        return (
                            <option value={option} key={index}> {option}</option>
                            )
                        })
                    }
                </select>


                <div className="shops__show-results">
                    <label>Minimum score: </label>
                    <select 
                        className="shopsort"
                        value={this.state.reviewsNumber}
                        onChange={this.handleReviewNumberChange}
                    >
                        { sortReviewNumberoptions.map((option, index) => {
                            return (
                                <option value={option} key={index}> {option}</option>
                                )
                            })
                        }
                    </select>
                </div>


                <div className="shops__show-results">
                    <label>Minimum reviews: </label>
                    <select 
                        className="shopsort"
                        value={this.state.reviewsAmount}
                        onChange={this.handleReviewAmountChange}
                    >
                        { sortReviewAmountroptions.map((option, index) => {
                            return (
                                <option value={option} key={index}> {option}+</option>
                                )
                            })
                        }
                    </select>
                </div>

                
                <div className="shoplist section">

                { renderShop() }
                
                </div>
            </Wrapper>
        )
    }
}

export default ShopList