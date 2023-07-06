import "./checkout-item.styles.scss";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const ChecoutItem = ({cartItem}) => {
    
    const { name, imageUrl, price, quantity } = cartItem;

    const { increaseCartQuantity, reduceCartQuantity, deleteItemFromCart } = useContext(CartContext);

    const increaseCartCountHandler = (product) => increaseCartQuantity(product);
  
    const reduceCartCountHandler = (product) => reduceCartQuantity(product);
  
    const deleteCartItemHandler = (product) => deleteItemFromCart(product);

    return (
      <div className="checkout-item-container">
        <div className="image-container">
            <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
          <div className="arrow" onClick={() => reduceCartCountHandler(cartItem)}>
            &#10094;
          </div>
          <span className="value">
            {quantity}
          </span>
          <div className="arrow" onClick={() => increaseCartCountHandler(cartItem)}>
            &#10095;
          </div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={() => deleteCartItemHandler(cartItem)}>&#10005;</div>
      </div>
    )
}

export default ChecoutItem