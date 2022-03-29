import {ActionsType} from "./reduxStore";

export type UsersType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: { country: string, city: string }
}
export type usersPageType = {
    users: Array<UsersType>
}

const initialState: usersPageType = {
    users: []
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"

export const FollowAC = (userId: number) => ({type: FOLLOW, userId} as const)
export const UnfollowAC = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const SetUsersAC = (users: UsersType[]) => ({type: SET_USERS, users} as const)

export const UsersPageReducer = (state: usersPageType = initialState, action: ActionsType): usersPageType => {
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
            return {...state, users: action.users}
        default:
            return state
    }
}