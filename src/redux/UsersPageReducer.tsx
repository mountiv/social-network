import {ActionsType} from "./reduxStore";
import {Dispatch} from "redux";
import {usersApi} from "../api/api";

export type UsersType = {
    id: number
    photos: { small: string | null, large: string | null }
    followed: boolean
    name: string
    status: string
    uniqueUrlName?: string | null
    // location: { country: string, city: string }
}
export type UsersState = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followInProgress: Array<number>
}

const initialState: UsersState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followInProgress: []
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-USERS-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
export const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE-FOLLOWING-PROGRESS"

export const followAccept = (userId: number) => ({type: FOLLOW, userId} as const)
export const unfollowAccept = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: UsersType[]) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId} as const)
//ThunkCreator
export const getUsers = (page: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    usersApi.getUsers(page, pageSize)
        .then(response => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(response.items))
            dispatch(setTotalUsersCount(response.totalCount ? response.totalCount : 0))
        })
}

export const unfollow = (id:number) => (dispatch:Dispatch) => {
    dispatch(toggleFollowingProgress(true, id))
    usersApi.unfollow(id)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(unfollowAccept(id))
                dispatch(toggleFollowingProgress(false, id))
            }
        })
}

export const follow = (id:number) => (dispatch:Dispatch) => {
    dispatch(toggleFollowingProgress(true, id))
    usersApi.follow(id)
        .then(response => {
                if (response.resultCode === 0) {
                    dispatch(followAccept(id))
                    dispatch(toggleFollowingProgress(false, id))
                }
            }
        )
}


export const UsersPageReducer = (state: UsersState = initialState, action: ActionsType): UsersState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map
                (u => u.id === action.userId ? {...u, followed: true} : u)
            };
        case UNFOLLOW:
            return {
                ...state, users: state.users.map
                (u => u.id === action.userId ? {...u, followed: false} : u)
            };
        case SET_USERS:
            return {...state, users: action.users};
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalUsersCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state, followInProgress: action.isFetching
                    ? [...state.followInProgress, action.userId]
                    : state.followInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

