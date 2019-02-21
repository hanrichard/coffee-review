import React from 'react';
import moment from 'moment';

const ShopSummary = ({shop}) => {
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{shop.shopname}</span>
                <p>{shop.shoplat}</p>
                <p>{shop.shoplon}</p>
                <p>address {shop.address} {shop.suburb}</p>
           </div>
        </div>
    )
}

export default ShopSummary