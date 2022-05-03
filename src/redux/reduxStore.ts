import {applyMiddleware, combineReducers, createStore} from "redux";
import {AddDialogMessageAC, ChangeDialogMessageTextAC, DialogsPageReducer} from "./DialogsPageReducer";
import {
    AddPostAC,
    ChangeNewTextAC,
    ProfilePageReducer,
    setUserProfile,
    setUserStatus,
    updateUserStatus
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
import {authReducer, setUserData} from "./AuthReducer";

export type ActionsType = ReturnType<typeof AddPostAC> | ReturnType<typeof ChangeNewTextAC> |
    ReturnType<typeof AddDialogMessageAC> | ReturnType<typeof ChangeDialogMessageTextAC> |
    ReturnType<typeof followAccept> | ReturnType<typeof unfollowAccept> | ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleIsFetching> | ReturnType<typeof setUserProfile> | ReturnType<typeof setUserStatus> |
    ReturnType<typeof updateUserStatus> |
    ReturnType<typeof setUserData> | ReturnType<typeof toggleFollowingProgress>;


let rootReducer = combineReducers({
    profilePage: ProfilePageReducer,
    dialogsPage: DialogsPageReducer,
    sideBar: SideBarReducer,
    usersPage: UsersPageReducer,
    auth: authReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof rootReducer>
export type DispatchType = typeof store.dispatch