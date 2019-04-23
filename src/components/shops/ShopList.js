import React from 'react';
import ShopSummary from './ShopSummary';
import { Link } from 'react-router-dom';

const ShopList = ({ shops, clickshop, reviews, suburb }) => {
    
    const newShops = shops && shops.map(shop => {
        return (
            <div key={shop.id} >

                <Link  
                    to={suburb + '/' + shop.id} 
                    >
                    <ShopSummary 
                        shop = {shop} 
                        reviews={reviews}
                    /> 
                </Link>
            </div>
            )   
        } 
    )
        
    if(newShops) {
        return (
            <div>
                <Link to={'/'}>Home</Link>
                <div className="project-list section">
                    { newShops }
                </div>
            </div>
        )
    }
    else {
        return <div className="container center">loading...</div>
    }
}


export default ShopList