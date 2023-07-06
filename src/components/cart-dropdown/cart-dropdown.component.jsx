import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context.jsx";

import Button from "../button/button.component.jsx";

import CartItem from "../cart-item/cart-item.component.jsx";

import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
    }

    const {cartItems} = useContext(CartContext);

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map(item => (
                        <CartItem key={item.id} cartItem={item} />
                    ))) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>
                    GO TO CHECKOUT
            </Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;