import React, {ComponentType, lazy, Suspense, useEffect} from 'react';
import s from './App.module.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Login} from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "./components/common/withRouter/withRouterHOC";
import {AppType, initializeApp} from "./redux/AppReducer";
import {RootStateType} from "./redux/reduxStore";
import {Preloader} from "./components/common/Preloader/Preloader";
import ResponsiveAppBar from "./components/NavBar/AppBar";
import Container from "@mui/material/Container";
import {CircularProgress} from "@mui/material";
import {ErrorSnackbar} from "./utils/ErrorSnackbar";


const ChatPage = lazy(() => import( "./components/Chat/ChatPage"));
const UsersContainer = lazy(() => import( "./components/Users/UsersContainer"));
const ProfileContainer = lazy(() => import( "./components/Profile/ProfileContainer"));

type AppPropsType = AppType & {
    initializeApp: () => void
}

const App = (props: AppPropsType) => {

    useEffect(() => {
        props.initializeApp()
    }, [])


    if (!props.initialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className={s.appWrapper}>
            <ResponsiveAppBar/>
            <Container fixed>
                <Suspense fallback={<Preloader/>}>
                    <Routes>
                        <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                        <Route path='/profile' element={<ProfileContainer/>}/>
                        <Route path='/' element={<Navigate to={'/profile'}/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/chat' element={<ChatPage/>}/>
                    </Routes>
                </Suspense>
                <ErrorSnackbar/>
            </Container>
        </div>
    );
}

const mapStateToProps = (state: RootStateType): AppType => {
    return {
        initialized: state.app.initialized,
        error: state.app.error
    }
}

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);
