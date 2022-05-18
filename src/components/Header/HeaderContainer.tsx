import React, {ComponentType} from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {authMe, logout} from "../../redux/AuthReducer";
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
    logout: () => void
}

export class HeaderContainer extends React.Component<AuthContainerType> {
    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout}/>
    }
}

const mapStateToProps = (state: RootStateType): { isAuth: boolean, login: string | null } => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.userLogin
    }
}

export default compose<ComponentType>(connect(mapStateToProps, {logout}))(HeaderContainer)