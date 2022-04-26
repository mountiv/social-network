import React from "react";
import s from './Header.module.css'
import {Link} from "react-router-dom";

type HeaderType = {
    isAuth: boolean
    login: string | null
}

export const Header = (props: HeaderType) => {
    return (
        <header className={s.header}>
            <img src='https://venngage-wordpress.s3.amazonaws.com/uploads/2019/04/Travel-Tour-Business-Logo.png'
                 alt='Logo'/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? props.login
                    : <Link to='/login'>Login</Link>
                }
            </div>
        </header>)
}
