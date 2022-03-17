import {combineReducers, createStore} from "redux";
import {DialogsPageReducer} from "./DialogsPageReducer";
import {ProfilePageReducer} from "./ProfilePageReducer";
import {SideBarReducer} from "./SideBarPageReducer";

let reducers = combineReducers({
    profilePage: ProfilePageReducer,
    dialogsPage: DialogsPageReducer,
    sideBar: SideBarReducer
})

export let store = createStore(reducers);

export type StoreType = typeof store