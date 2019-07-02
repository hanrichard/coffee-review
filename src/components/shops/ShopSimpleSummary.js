import React from 'react';

const ShopSimpleSummary = ({shop}) => {
    return (
        <div className="card">
            <div className="card-content" style={{padding: 5}}>
                <div><b>{shop.shopname}</b></div>
                <div>Address: {shop.address}, {shop.suburb}</div>
            </div>   
        </div>
    )
}

export default ShopSimpleSummary