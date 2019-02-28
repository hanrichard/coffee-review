import React from 'react';

const ShopSimpleSummary = ({shop}) => {
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{shop.shopname}</span>
                <p>Address: {shop.address}, {shop.suburb}</p>
           </div>
        </div>
    )
}

export default ShopSimpleSummary