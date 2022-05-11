import {applyMiddleware, combineReducers, createStore} from "redux";
import {AddDialogMessageAC, DialogsPageReducer} from "./DialogsPageReducer";
import {
    AddPostAC,
    ProfilePageReducer, setNewStatus,
    setUserProfile,
    setUserStatus,
} from "./ProfilePageReducer";
import {SideBarReducer} from "./SideBarPageReducer";
import thunk from 'redux-thunk'
import {
    followAccept,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingProgress, toggleIsFetching,
    unfollowAccept,
    UsersPageReducer
} from "./UsersPageReducer";
import {authReducer, setFormData, setUserData} from "./AuthReducer";
import { reducer as formReducer } from 'redux-form'

export type ActionsType = ReturnType<typeof AddPostAC> |
    ReturnType<typeof AddDialogMessageAC> | ReturnType<typeof followAccept> | ReturnType<typeof unfollowAccept> | ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleIsFetching> | ReturnType<typeof setUserProfile> | ReturnType<typeof setUserStatus> |
    ReturnType<typeof setNewStatus> |
    ReturnType<typeof setUserData> | ReturnType<typeof toggleFollowingProgress> |
    ReturnType<typeof setFormData>    ;


let rootReducer = combineReducers({
    profilePage: ProfilePageReducer,
    dialogsPage: DialogsPageReducer,
    sideBar: SideBarReducer,
    usersPage: UsersPageReducer,
    auth: authReducer,
    form: formReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof rootReducer>
export type DispatchType = typeof store.dispatch

//@ts-ignore
window.store = store