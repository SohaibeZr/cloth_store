import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import { 
    navigationContainer,
    LogoContainer,
    NavLinks,
    NavLinksContainer 
} from "./navigation.styles.jsx";

import CartIcon from "../../components/cart-icon/cart-icon.component.jsx";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component.jsx";

import { UserContext } from "../../contexts/user.context.jsx";

import { CartContext } from "../../contexts/cart.context.jsx";

import { signOutUser } from "../../utils/firebase/firebase.utils.js";

const Navigation = () => {
    
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    return (
        <Fragment>
            <navigationContainer>
                <LogoContainer to="/">
                    <img src="https://raw.githubusercontent.com/ZhangMYihua/crwn-clothing-v2/39aaa7ba2322046d6bfbc6d4b74f291f10d61cb6/src/assets/crown.svg" alt="nothing working" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLinks to="/shop">
                        SHOP
                    </NavLinks>
                    {currentUser ? (
                        <NavLinks as="span" onClick={signOutUser}>SIGN OUT</NavLinks>
                    ) : (
                        <NavLinks to="/auth">
                            SIGN IN
                        </NavLinks>
                    )}
                    <CartIcon />
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
            </navigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;