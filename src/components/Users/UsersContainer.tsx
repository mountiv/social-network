import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {
    follow, getUsers, searchUser,
    setCurrentPage,
    unfollow,
    UsersState,
} from "../../redux/UsersPageReducer";
import React, {ComponentType} from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";


type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    getUsers: (currentPage: number, pageSize: number, userName: string) => void
    searchUser: (userName: string) => void
}

export type UsersPropsType = UsersState & mapDispatchToPropsType

export class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, '')
    }

    onPageChanged = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.setCurrentPage(page)
        this.props.getUsers(page, this.props.pageSize, this.props.term)
    }

    onSearchUser = (userName: string) => {
        this.props.getUsers(1, this.props.pageSize, userName)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                followInProgress={this.props.followInProgress}
                onSearchUser={this.onSearchUser}
            />
        </>
    }
}

const mapStateToProps = (state: RootStateType): UsersState => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followInProgress: state.usersPage.followInProgress,
        term: state.usersPage.term
    }
}

export default compose<ComponentType>(connect(mapStateToProps,
    {
        follow, unfollow, setCurrentPage, getUsers, searchUser
    }))(UsersContainer)