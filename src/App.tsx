import React, {ComponentType, lazy, Suspense, useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {NavBar} from "./components/NavBar/NavBar";
import {Link, Navigate, Route, Routes} from "react-router-dom";
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
import {
    MessageOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu} from 'antd';
import {useState} from 'react';

const {Header, Content, Footer, Sider} = Layout;

const Dialogs = lazy(() => import( "./components/Dialogs/DialogsContainer"));
const UsersContainer = lazy(() => import( "./components/Users/UsersContainer"));
const ProfileContainer = lazy(() => import( "./components/Profile/ProfileContainer"));

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to="/profile">Profile</Link>, '1',  <UserOutlined/>),
    getItem(<Link to="/dialogs">Dialogs</Link>, '2', <MessageOutlined />),
    getItem(<Link to="/users">Users</Link>, '3',<TeamOutlined />)
];

type AppPropsType = AppType & {
    initializeApp: () => void
}

const App = (props: AppPropsType) => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        props.initializeApp()
    }, [])


    if (!props.initialized) {
        return <Preloader/>
    }
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header className="site-layout-background" style={{padding: 0}}>
                {/*<Breadcrumb style={{margin: '16px 0', color: 'white'}}>*/}
                {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
            </Header>
            <Layout className="site-layout">
                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
                </Sider>
                <Content style={{margin: '0 16px'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <Suspense fallback={<Preloader/>}>
                            <Routes>
                                <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                                <Route path='/profile' element={<ProfileContainer/>}/>
                                <Route path='/' element={<Navigate to={'/profile'}/>}/>
                                <Route path='/dialogs' element={<Dialogs/>}/>
                                <Route path='/users' element={<UsersContainer/>}/>
                                <Route path='/news' element={<News/>}/>
                                <Route path='/music' element={<Music/>}/>
                                <Route path='/settings' element={<Settings/>}/>
                                <Route path='/login' element={<Login/>}/>
                            </Routes>
                        </Suspense>
                    </div>
                </Content>
            </Layout>
        </Layout>
        // <div className='app-wrapper'>
        //     <HeaderContainer/>
        //     <NavBar/>
        //     <div className='app-wrapper content'>
        //
        //
        //     </div>
        // </div>
    );
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
