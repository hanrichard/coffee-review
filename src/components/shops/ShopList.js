import React from 'react';
import ShopSummary from './ShopSummary';
import { Link } from 'react-router-dom';

const ShopList = ({ shops, clickshop, reviews }) => {
    const newShops = shops && shops.map(shop => {
        return (
                <Link key={shop.id}  
                    to={'/shops/' + shop.id} 
                    >
                    <ShopSummary shop = {shop} reviews={reviews}/> 
                </Link>
            )
        }
    )

    if(newShops) {
        return (
            <div className="project-list section">
                { newShops }
            </div>
        )
    }
    else {
        return <div className="container center">loading...</div>
    }
}


export default ShopList