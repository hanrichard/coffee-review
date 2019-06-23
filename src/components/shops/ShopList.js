import React from 'react';
import ShopSummary from './ShopSummary';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    select {
        margin-top: 10px;
        display: block;
    }
    .shoplist {
    }
`     

const ShopList = ({ shops, clickshop, reviews, suburb }) => {
    const newShops = shops && shops.map(shop => {
        return (
            <div key={shop.id} >
                <Link to={suburb + '/' + shop.id} >
                    <ShopSummary 
                        shop={shop} 
                        reviews={reviews}
                    /> 
                </Link>
            </div>
            )   
        } 
    )
     
    return (
        newShops ? 
        <Wrapper>
            <Link to={'/'}>Home</Link>

            <select className="shopsort">
                <option>shop review highest</option>
                <option>shop review lowest</option>
                <option>shop review oldest</option>
                <option>shop review newest</option>
            </select>
            <div className="shoplist section">
                { newShops }
            </div>
        </Wrapper>
        :
        <div className="container center">loading...</div>
    )
}

export default ShopList