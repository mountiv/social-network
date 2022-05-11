import React from "react";
import s from './Header.module.css'
import {Link} from "react-router-dom";

type HeaderType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

export const Header = (props: HeaderType) => {
    return (
        <header className={s.header}>
            <img src='https://venngage-wordpress.s3.amazonaws.com/uploads/2019/04/Travel-Tour-Business-Logo.png'
                 alt='Logo'/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <Link to='/login'>Login</Link>
                }
            </div>
        </header>)
}
