import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const isCartItemExist = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (isCartItemExist) {
        return cartItems.map(item => {
            if (item.id === productToAdd.id) item.quantity++;
            return item;
        });
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const deleteCartItem = (cartItems, productToDelete) => {
    const isProductExist = cartItems.find(item => item.id === productToDelete.id);

    if (!isProductExist) return cartItems;
    return cartItems.filter(item => item.id !== productToDelete.id);
}

const increaseCartCount = (cartItems, product) => {
    const isCartItemExist = cartItems.find(cartItem => cartItem.id === product.id);

    if (!isCartItemExist) return cartItems;
    return cartItems.map(item => {
        if (item.id === product.id) item.quantity++;
        return item;
    })
}

const reduceCartCount = (cartItems, product) => {
    const isCartItemExist = cartItems.find(cartItem => cartItem.id === product.id);
    
    
    if (!isCartItemExist || product.quantity <= 1) return cartItems;
    return cartItems.map(item => {
        if (item.id === product.id) item.quantity--;
        return item;
    })
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    increaseCartQuantity: () => {},
    reduceCartQuantity: () => {},
    deleteItemFromCart: () => {},
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems ,productToAdd))
    }

    const increaseCartQuantity = (product) => {
        setCartItems(increaseCartCount(cartItems, product));
    }

    const reduceCartQuantity = (product) => {
        setCartItems(reduceCartCount(cartItems, product));
    }

    const deleteItemFromCart = (product) => {
        setCartItems(deleteCartItem(cartItems, product));
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        increaseCartQuantity, 
        reduceCartQuantity,
        deleteItemFromCart,
        cartTotal
    };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}