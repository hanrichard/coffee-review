import React from 'react';
import ShopSummary from './ShopSimpleSummary';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ShopSimpleList = ({ shops }) => {
    const newShops = shops && shops.map(shop => {
        return (
            <Link key={shop.id}  
                to={'/' + shop.suburb.replace(' ','-') + '/' + shop.id} 
                >
                <ShopSummary 
                    shop = {shop} 
                /> 
            </Link>
            )
        }
    )

    return(
        <div className="project-list section"> { newShops ?  newShops : "loading..." } </div>
    )
}


export default ShopSimpleList