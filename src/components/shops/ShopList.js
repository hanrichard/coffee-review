import React from 'react';
import ShopSummary from './ShopSummary';
import { Link } from 'react-router-dom'

const ShopList = ({ shops }) => {
    const newShops = shops && shops.map(shop => {
        return (
                <Link key={shop.id}  to={'/shops/' + shop.id}>
                    <ShopSummary shop = {shop} /> 
                </Link>
            )
        }
    )
    return (
        <div className="project-list section">
            { newShops }
        </div>
    )
}

export default ShopList