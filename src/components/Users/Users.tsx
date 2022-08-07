import React from "react";
import s from "./Users.module.css"
import {UsersType} from "../../redux/UsersPageReducer";
import {User} from "./User";
import {Search} from "../common/searchBlock/Search";
import {Pagination} from "@mui/material";

type UsersProps = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (id: number) => void
    unfollow: (id: number) => void
    users: Array<UsersType>
    onPageChanged: (event: React.ChangeEvent<unknown>, page: number) => void
    followInProgress: number[]
    onSearchUser: (userName: string) => void
}

export const Users = ({totalUsersCount, currentPage, onPageChanged, pageSize, ...props}: UsersProps) => {


    return <div className={s.wrapper}>
        <div className={s.searching}>
            <Search onSearch={props.onSearchUser} />
            <Pagination
                count={Math.ceil(totalUsersCount / pageSize)}
                page={currentPage}
                onChange={onPageChanged}
            />
        </div>
        {props.users.map(u =>
            <User key={u.id}
                  user={u}
                  follow={props.follow}
                  unfollow={props.unfollow}
                  followInProgress={props.followInProgress}
            />)}

    </div>
}