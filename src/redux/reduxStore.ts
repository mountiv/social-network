import {combineReducers, createStore} from "redux";
import {AddDialogMessageAC, ChangeDialogMessageTextAC, DialogsPageReducer} from "./DialogsPageReducer";
import {AddPostAC, ChangeNewTextAC, ProfilePageReducer, setUserProfile} from "./ProfilePageReducer";
import {SideBarReducer} from "./SideBarPageReducer";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching,
    unfollow,
    UsersPageReducer
} from "./UsersPageReducer";
import {authReducer, setUserData} from "./AuthReducer";

export type ActionsType = ReturnType<typeof AddPostAC> | ReturnType<typeof ChangeNewTextAC> |
    ReturnType<typeof AddDialogMessageAC> | ReturnType<typeof ChangeDialogMessageTextAC> |
    ReturnType<typeof follow> | ReturnType<typeof unfollow> | ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleIsFetching> | ReturnType<typeof setUserProfile> |
    ReturnType<typeof setUserData>;


let rootReducer = combineReducers({
    profilePage: ProfilePageReducer,
    dialogsPage: DialogsPageReducer,
    sideBar: SideBarReducer,
    usersPage: UsersPageReducer,
    auth: authReducer
})

export let store = createStore(rootReducer);

export type RootStateType = ReturnType<typeof rootReducer>
export type DispatchType = typeof store.dispatch