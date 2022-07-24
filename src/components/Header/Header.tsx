import React from "react";
import s from './Header.module.css'
import {Link} from "react-router-dom";
import {Button} from "antd";

type HeaderType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

export const Header = (props: HeaderType) => {
    return (
        <header className={s.header}>
            <div>
                <img className={s.logo}
                     src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF-_CfVP6eBNTbM1cyAyO9JjgbWPaix_oTJFhsXmnboTlnP0mL3RJHo0JVQYG9giJLJwc&usqp=CAU'
                     alt='Logo'/>
            </div>
            <div>
                {/*<div className={s.loginBlock}>*/}
                {props.isAuth
                    ? <div>
                        <span className={s.login}>{props.login}</span>
                        <Button type={'primary'} onClick={props.logout}>Log out</Button>
                    </div>
                    : <Link to='/login'>Login</Link>
                }
            </div>
        </header>)
}
