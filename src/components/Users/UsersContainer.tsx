import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {FollowAC, SetUsersAC, UnfollowAC, UsersState, UsersType} from "../../redux/UsersPageReducer";
import {Dispatch} from "redux";
import UsersC from "./UsersC";


type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
}

export type UsersPropsType = UsersState & mapDispatchToPropsType

const mapStateToProps = (state: RootStateType): UsersState => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(FollowAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(UnfollowAC(userId))
        },
        setUsers: (users: UsersType[]) => {
            dispatch(SetUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC)