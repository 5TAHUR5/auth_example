import React, {useContext, useEffect, useState} from 'react';
import classes from "./Navbar.module.css"
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/index";
import {allPages, privatePages, publicPages} from "../../routes/router";

const Navbar = () => {

    const [navbarHide, setNavbarHide] = useState(true)
    const [links, setLinks] = useState([])
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const onSetNavbarHide = () => {
        setNavbarHide(!navbarHide)
    }

    const logout = () => {
        localStorage.removeItem("auth")
        setIsAuth(false)
        window.location.href = "/login"
    }

    useEffect(() => {
        const returnLinks = []
        allPages.forEach((link) => {
            returnLinks.push(<div key={link.path} className={classes.navlink}><Link className={classes.upper_link} to={link.path}>{link.name}</Link></div>)
        })
        if (isAuth) {
            privatePages.forEach((link) => {
                returnLinks.push(<div key={link.path} className={classes.navlink}><Link className={classes.upper_link} to={link.path}>{link.name}</Link></div>)
            })
            returnLinks.push(
                <div key={"fxtjrtzjsrzfj"} className={classes.navlink}>
                    <a onClick={() => logout}
                            className={classes.upper_link}>Выйти</a>
                </div>)
        } else {
            publicPages.forEach((link) => {
                returnLinks.push(<div key={link.path} className={classes.navlink}><Link className={classes.upper_link} to={link.path}>{link.name}</Link></div>)
            })
        }
        setLinks(returnLinks)
    }, [isAuth])

    return (
        <div className={navbarHide ? classes.navbarHide : classes.navbarVisible}>
            <button onClick={onSetNavbarHide} className={classes.btn_hideNavbar}>
                <span className={classes.arrow_hideNavbar}>{navbarHide ? ">" : "<"}</span>
            </button>
            <div className={navbarHide ? classes.nav__links_hide : classes.navbar__links}>
                {links}
            </div>
        </div>
    );
};

export default Navbar;