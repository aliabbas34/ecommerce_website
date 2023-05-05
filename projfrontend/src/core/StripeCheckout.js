import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const StripeCheckout = ({
    products, 
    setRedirect=f=>f, 
    reload=undefined
})=>{
    return(
        <div>
            <h3 className="text-white">Stripe checkout loaded</h3>
        </div>
    );
};

export default StripeCheckout;