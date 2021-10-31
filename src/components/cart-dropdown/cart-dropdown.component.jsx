import React from "react";

import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropDown = () => (
    <div className="cart-dropdown">
        <div className="cart-item">
        </div>
        <CustomButton style={{ fontSize:'11px' }}>GO TO CHECKOUT</CustomButton>
    </div>
)

export default CartDropDown;