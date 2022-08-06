import React from 'react'
import { 
    Nav, 
    NavLink, 
    NavMenu, 
    NavLogo, 
    NavLoginBtn, 
    NavSignUpBtn, 
    NavBtnLink
} from "./HeaderElements.js";

const SignedOutHeader = () => {
  return (
    <>
        <Nav>
            <NavMenu>
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="/resources" activeStyle>
                    Resources
                </NavLink>
                <NavLink to="/pricing" activeStyle>
                    Pricing
                </NavLink>
            </NavMenu>
            <NavLogo to="/">
                <h1>Logo</h1>
            </NavLogo>
            <NavLoginBtn>
                <NavBtnLink to="/log-in">Log In</NavBtnLink>
            </NavLoginBtn>
            <NavSignUpBtn>
                <NavBtnLink to="/sign-up-free">Sign Up Free</NavBtnLink>
            </NavSignUpBtn>
        </Nav>
    </>
  )
}

export default SignedOutHeader;