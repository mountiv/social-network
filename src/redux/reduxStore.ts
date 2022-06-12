import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {DialogsActionsType, DialogsPageReducer} from "./DialogsPageReducer";
import {ProfileActionsType, ProfilePageReducer,} from "./ProfilePageReducer";
import {SideBarReducer} from "./SideBarPageReducer";
import thunk from 'redux-thunk'
import {UsersActionsType, UsersPageReducer} from "./UsersPageReducer";
import {AuthActionsType, authReducer} from "./AuthReducer";
import {reducer as formReducer} from 'redux-form'
import {AppActionsType, appReducer} from "./AppReducer";

export type ActionsType = ProfileActionsType
    | AppActionsType
    | AuthActionsType
    | DialogsActionsType
    | UsersActionsType


let rootReducer = combineReducers({
    profilePage: ProfilePageReducer,
    dialogsPage: DialogsPageReducer,
    sideBar: SideBarReducer,
    usersPage: UsersPageReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootStateType = ReturnType<typeof rootReducer>
export type DispatchType = typeof store.dispatch

//@ts-ignore
window.store = store