import React from 'react';
import moment from 'moment';

const ShopSummary = ({shop}) => {
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{shop.shopname} titile</span>
                <p>{shop.shoplat}</p>
                <p>{shop.shoplon}</p>
           </div>
        </div>
    )
}

export default ShopSummary