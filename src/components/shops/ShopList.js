import React, {Component} from 'react';
import ShopSummary from './ShopSummary';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const Wrapper = styled.div`
    .select .shopsort{
        margin-top: 10px;
        display: block;
        width: 100%;
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
    .selectEmpty {
        display: flex;
        text-align: left;
        height: 40px;
        margin-bottom: 10px;
    }
    .selectclass {
        width: 100%
    }
`   

class ShopList extends Component {
    state = {
        value: '',
        reviewsNumber: '',
        reviewsAmount: ''
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
                <div variant="filled" className="formControl select"
                        classes={{root: 'selectWrapperclass'}}

                style={{
                    width: '100%'
                }}>
                    <Select
                        className="shopsort"
                        value={this.state.value}
                        onChange={this.handleChange}
                        name="age"
                        displayEmpty
                        className="selectEmpty"
                        classes={{root: 'selectclass'}}
                        >
                        <MenuItem value="" disabled>
                            Sort by
                        </MenuItem>

                        { sortoptions.map((option, index) => {
                            return (
                                <MenuItem value={option} key={index}> {option}</MenuItem>
                                )
                            })
                        }
                    </Select>  
                </div>   

                 <div variant="filled" className="formControl select"
                style={{
                    width: '100%'
                }}>
                    <Select
                        className="shopsort"
                        value={this.state.reviewsNumber}
                        onChange={this.handleReviewNumberChange}
                        name="age"
                        displayEmpty
                        classes={{root: 'selectclass'}}
                        className="selectEmpty"
                        >
                        <MenuItem value="" disabled>
                            Minimum scores:
                        </MenuItem>

                        { sortReviewNumberoptions.map((option, index) => {
                            return (
                                <MenuItem value={option} key={index}> {option}</MenuItem>
                                )
                            })
                        }
                    </Select>  
                </div>     

            

                 <div variant="filled" className="formControl select"
                style={{
                    width: '100%'
                }}>
                    <Select
                        className="shopsort"
                        value={this.state.reviewsAmount}
                        onChange={this.handleReviewAmountChange}
                        name="age"
                        displayEmpty
                        classes={{root: 'selectclass'}}
                        className="selectEmpty"
                        >
                        <MenuItem value="" disabled>
                            Minimum reviews:
                        </MenuItem>

                        { sortReviewAmountroptions.map((option, index) => {
                            return (
                                <MenuItem value={option} key={index}> {option}</MenuItem>
                                )
                            })
                        }
                    </Select>  
                </div>      
                   
                <div className="shoplist section">

                { renderShop() }
                
                </div>
            </Wrapper>
        )
    }
}

export default ShopList