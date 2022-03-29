import React from "react";
import { Link } from "react-router-dom";
import s from './NavBar.module.css'

export const NavBar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <Link to="/profile" >Profile</Link>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <Link to="/dialogs">Messages</Link>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <Link to="/users">Users</Link>
            </div>
            <div className={s.item}>
                <Link to="/news">News</Link>
            </div>
            <div className={s.item}>
                <Link to="/music">Music</Link>
            </div>
            <div className={s.item}>
                <Link to="/settings">Settings</Link>
            </div>
        </nav>
    )
}
