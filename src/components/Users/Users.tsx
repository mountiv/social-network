import React from "react";
import {UsersType} from "../../redux/UsersPageReducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

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

export const Users = ({totalUsersCount, currentPage, onPageChanged, pageSize, ...props}: UsersProps) => {
    return <div>
        <Paginator onPageChanged={onPageChanged}
                   currentPage={currentPage}
                   pageSize={pageSize}
                   totalUsersCount={totalUsersCount}/>
        {props.users.map(u =>
            <User key={u.id}
                  user={u}
                  follow={props.follow}
                  unfollow={props.unfollow}
                  followInProgress={props.followInProgress}
            />)}

    </div>
}