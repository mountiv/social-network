import {Link} from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";
import s from "./Users.module.css";
import React from "react";
import {UsersType} from "../../redux/UsersPageReducer";

type UserPropsType = {
    user: UsersType
    follow: (id: number) => void
    unfollow: (id: number) => void
    followInProgress: number[]
}

export const User = ({user, ...props}: UserPropsType) => {

    return <div>
                <span>
                    <div>
                        <Link to={'/profile/' + user.id}>
                        <img alt={'ava'} src={user.photos.small !== null ? user.photos.small : userPhoto}
                             className={s.avatar}/>
                        </Link>
                    </div>
                    <div>{user.followed
                        ? <button disabled={props.followInProgress.some(id => id === user.id)} onClick={() => {
                            props.unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={props.followInProgress.some(id => id === user.id)} onClick={() => {
                            props.follow(user.id)
                        }}>Follow</button>}</div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                     </span>
                    <span>
                        <div>{'location.country'}</div>
                        <div>{'location.city'}</div>
                     </span>
                </span>
            </div>
}