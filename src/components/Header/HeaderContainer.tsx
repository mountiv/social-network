import React, {ComponentType} from "react";
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {AuthType, loginUser, setUserData} from "../../redux/AuthReducer";
import {toggleIsFetching} from "../../redux/UsersPageReducer";
import {authApi} from "../../api/api";
import {compose} from "redux";

export type AuthResponse = {
    resultCode: number
    messages: Array<string>,
    data: {
        id: number
        email: string
        login: string
    }
    isFetching: boolean

}

export type AuthContainerType = {
    isAuth: boolean
    login: string | null
    loginUser: () => void
}

export class HeaderContainer extends React.Component<AuthContainerType> {
    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
    }

    componentDidMount() {
        this.props.loginUser()
    }
}

const mapStateToProps = (state: RootStateType): { isAuth: boolean, login: string | null } => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.userLogin
    }
}

export default compose<ComponentType>(connect(mapStateToProps, {loginUser}))(HeaderContainer)