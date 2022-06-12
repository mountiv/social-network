import React, {ComponentType, lazy, Suspense} from 'react';
import './App.css';
import {NavBar} from "./components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
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
import HeaderContainer from "./components/Header/HeaderContainer";
import {withSuspense} from "./components/common/withSuspense/withSuspense";

const Dialogs = lazy(() => import( "./components/Dialogs/DialogsContainer"));
const UsersContainer = lazy(() => import( "./components/Users/UsersContainer"));
const ProfileContainer = lazy(() => import( "./components/Profile/ProfileContainer"));


type AppPropsType = AppType & {
    initializeApp: () => void
}

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='app-wrapper content'>
                    <Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/profile' element={<ProfileContainer/>}/>
                            <Route path='/dialogs' element={<Dialogs/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/news' element={<News/>}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/settings' element={<Settings/>}/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                    </Suspense>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateType): AppType => {
    return {
        initialized: state.app.initialized
    }
}

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);
