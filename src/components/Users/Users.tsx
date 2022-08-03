import React from "react";
import {UsersType} from "../../redux/UsersPageReducer";
import {User} from "./User";
import {Search} from "../common/searchBlock/Search";
import {TablePagination} from "@mui/material";

type UsersProps = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (id: number) => void
    unfollow: (id: number) => void
    users: Array<UsersType>
    onPageChanged: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void
    followInProgress: number[]
    onSearchUser: (userName: string) => void
}

export const Users = ({totalUsersCount, currentPage, onPageChanged, pageSize, ...props}: UsersProps) => {


    return <div>
        <div>
            <Search onSearch={props.onSearchUser}/>
            {/*<Paginator onPageChanged={onPageChanged}*/}
            {/*           currentPage={currentPage}*/}
            {/*           pageSize={pageSize}*/}
            {/*           totalUsersCount={totalUsersCount}/>*/}
            <TablePagination
                component="div"
                count={totalUsersCount}
                page={currentPage}
                onPageChange={onPageChanged}
                rowsPerPage={pageSize}
                //onRowsPerPageChange={handleChangeRowsPerPage}
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