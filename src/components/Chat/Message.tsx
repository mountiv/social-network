import s from "../Users/User.module.css";
import {Link} from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";
import React from "react";
import {useAppSelector} from "../../redux/reduxStore";
import {ChatMessageType} from "./ChatPage";

export const Message = ({message}: { message: ChatMessageType }) => {

    return <div>
        <div className={s.avaWrapper}>
            <Link to={'/profile/' + message.userId}>
                <img alt={'ava'} src={message.photo}
                     className={s.avatar}/>
            </Link>
        </div>
        <b>{message.userName}</b>
        <a>{message.message}</a>
    </div>
}