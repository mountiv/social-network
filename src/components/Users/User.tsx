import {Link} from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";
import s from "./User.module.css";
import React from "react";
import {UsersType} from "../../redux/UsersPageReducer";
import Button from "@mui/material/Button";
import {Card} from "@mui/material";

type UserPropsType = {
    user: UsersType
    follow: (id: number) => void
    unfollow: (id: number) => void
    followInProgress: number[]
}

export const User = ({user, ...props}: UserPropsType) => {

    return <Card sx={{minWidth: 300, minHeight: 120, marginBottom: 3 }}>
        <div className={s.wrapper}>
            <div className={s.avaWrapper}>
            <Link to={'/profile/' + user.id}>
                <img alt={'ava'} src={user.photos.small !== null ? user.photos.small : userPhoto}
                     className={s.avatar}/>
            </Link>
            </div>
            <div className={s.nameBlock}>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </div>
        </div>
        <div className={s.button}>
            {user.followed
                ? <Button variant={"outlined"} disabled={props.followInProgress.some(id => id === user.id)} onClick={() => {
                    props.unfollow(user.id)
                }}>Unfollow</Button>
                : <Button variant={"contained"} disabled={props.followInProgress.some(id => id === user.id)} onClick={() => {
                    props.follow(user.id)
                }}>Follow</Button>}
        </div>
    </Card>
}