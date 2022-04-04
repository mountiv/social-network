import {ActionsType} from "./reduxStore";

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
}

const initialState: UsersState = {
    users: [],
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"

export const FollowAC = (userId: number) => ({type: FOLLOW, userId} as const)
export const UnfollowAC = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const SetUsersAC = (users: UsersType[]) => ({type: SET_USERS, users} as const)

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
            return {...state, users: action.users}
        default:
            return state
    }
}