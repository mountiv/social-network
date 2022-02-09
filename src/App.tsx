import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";

function App() {
    return (
        <div className='app-wrapper'>
            <Header/>
            <NavBar/>
            <Profile/>
        </div>
    );
}

export default App;
