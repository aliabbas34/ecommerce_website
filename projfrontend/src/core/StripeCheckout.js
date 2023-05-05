import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const StripeCheckout = ({
    products, 
    setRedirect=f=>f, 
    reload=undefined
})=>{


    const [data, setData]=useState({
        loading:false,
        success: false,
        error:"",
        address: ""
    });


    const token= isAuthenticated() && isAuthenticated().token;
    const userId= isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice=()=>{
        let amount =0;
        products.map(p=>{
            amount=amount+p.price;
        });
        return amount;
    };


    const showStripeButton=()=>{
        return isAuthenticated() ? (
            <button className="btn btn-success">Pay with Stripe</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }

    return(
        <div>
            <h3 className="text-white">Stripe checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    );
};

export default StripeCheckout;