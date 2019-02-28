import React from 'react';

const ShopSimpleSummary = ({shop}) => {
    return (
        <div className="collection">
            <div>
                <span className="card-title">{shop.shopname}</span>
                <span>Address: {shop.address}, {shop.suburb}</span>
           </div>
        </div>
    )
}

export default ShopSimpleSummary