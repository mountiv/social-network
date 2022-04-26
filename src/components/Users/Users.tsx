import s from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import React from "react";
import {UsersType} from "../../redux/UsersPageReducer";
import {Link} from "react-router-dom";
import {usersApi} from "../../api/api";

type UsersProps = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (id: number) => void
    unfollow: (id: number) => void
    users: Array<UsersType>
    onPageChanged: (page: number) => void
    followInProgress: number[]
}

export const Users = (props: UsersProps) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p =>
                <span onClick={() => props.onPageChanged(p)}
                      className={props.currentPage === p ? s.selected : ''}>{p}</span>
            )}
        </div>
        {props.users.map((u =>
            <div key={u.id}>
                <span>
                    <div>
                        <Link to={'/profile/' + u.id}>
                        <img alt={'ava'} src={u.photos.small !== null ? u.photos.small : userPhoto}
                             className={s.avatar}/>
                        </Link>
                    </div>
                    <div>{u.followed
                        ? <button disabled={props.followInProgress.some(id => id === u.id)} onClick={() => {
                            props.unfollow(u.id)
                        }}>Unfollow</button>
                        : <button disabled={props.followInProgress.some(id => id === u.id)} onClick={() => {
                            props.follow(u.id)
                        }}>Follow</button>}</div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                     </span>
                    <span>
                        <div>{'location.country'}</div>
                        <div>{'location.city'}</div>
                     </span>
                </span>
            </div>))}
    </div>
}