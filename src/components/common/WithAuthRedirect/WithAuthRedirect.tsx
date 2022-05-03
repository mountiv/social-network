import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/reduxStore";
import {ComponentType} from "react";

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: T) => {
        const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)
        if (!isAuth) return <Navigate to={'/login'}/>
        return <Component {...props}/>
    }
    return RedirectComponent
}