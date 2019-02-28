import React from 'react';
import ShopSummary from './ShopSummary';
import { Link } from 'react-router-dom';

const ShopSimpleList = ({ shops }) => {
    const newShops = shops && shops.map(shop => {
        return (
                <Link key={shop.id}  
                    to={shop.suburb + '/' + shop.id} 
                    >
                    <ShopSummary 
                        shop = {shop} 
                    /> 
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


export default ShopSimpleList