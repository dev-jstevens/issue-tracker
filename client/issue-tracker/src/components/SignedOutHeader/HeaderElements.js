import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

export const Nav = styled.nav`
    background: #000;
    height: 100px;
    display: flex;
    z-index: 10;
`

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 2rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #15cdfc;
    }
`

export const NavMenu = styled.div`
    display: flex;
    margin-left: 20px;
    margin-right: 30%;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavLogo = styled(Link)`
    color: #fff;
    display: flex;
    margin-left: -10px;
    margin-right: 25%;
    align-items: center;
    text-decoration: none;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #15cdfc;
    }
`

export const NavLoginBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-left: 110px;
    margin-right: 5px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`
export const NavSignUpBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtnLink = styled(Link)`
    border-radius: 0px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 24px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`