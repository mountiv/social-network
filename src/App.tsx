import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {StoreType} from "./redux/state";

type PropsType = {
    store: StoreType
}

function App(props: PropsType) {
    const state = props.store.getState()
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <NavBar/>
                <div className='app-wrapper content'>
                    <Routes>
                        <Route path='/profile' element={<Profile profilePage={state.profilePage}
                                                                 dispatch={props.store.dispatch.bind(props.store)}
                                                                 message={state.profilePage.newPostText}/>}/>
                        <Route path='/dialogs'
                               element={<Dialogs dialogsPage={state.dialogsPage}
                                                 dispatch={props.store.dispatch.bind(props.store)}
                                                 message={state.dialogsPage.newMessageText}/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                    </Routes>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
