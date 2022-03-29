import {combineReducers, createStore} from "redux";
import {AddDialogMessageAC, ChangeDialogMessageTextAC, DialogsPageReducer} from "./DialogsPageReducer";
import {AddPostAC, ChangeNewTextAC, ProfilePageReducer} from "./ProfilePageReducer";
import {SideBarReducer} from "./SideBarPageReducer";
import {FollowAC, SetUsersAC, UnfollowAC, UsersPageReducer} from "./UsersPageReducer";

export type ActionsType = ReturnType<typeof AddPostAC> | ReturnType<typeof ChangeNewTextAC> |
    ReturnType<typeof AddDialogMessageAC> | ReturnType<typeof ChangeDialogMessageTextAC> |
    ReturnType<typeof FollowAC> | ReturnType<typeof UnfollowAC> | ReturnType<typeof SetUsersAC>;


let rootReducer = combineReducers({
    profilePage: ProfilePageReducer,
    dialogsPage: DialogsPageReducer,
    sideBar: SideBarReducer,
    usersPage: UsersPageReducer
})

export let store = createStore(rootReducer);

export type RootStateType = ReturnType<typeof rootReducer>
export type DispatchType = typeof store.dispatch