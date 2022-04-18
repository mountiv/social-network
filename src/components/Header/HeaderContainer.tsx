import React from "react";
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {AuthType, setUserData} from "../../redux/AuthReducer";
import {toggleIsFetching} from "../../redux/UsersPageReducer";

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
    setUserData: (userId: number, email: string, login: string) => void
    toggleIsFetching: (isFetching: boolean) => void
}

export class HeaderC extends React.Component<AuthContainerType> {
    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
    }

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get<AuthResponse>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                this.props.toggleIsFetching(false)
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setUserData(id, email, login)
                }
                debugger
            })
    }
}

const mapStateToProps = (state: RootStateType): { isAuth: boolean, login: string | null } => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.userLogin
    }
}

export const HeaderContainer = connect(mapStateToProps, {setUserData, toggleIsFetching})(HeaderC)