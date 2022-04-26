import { Navigate } from "react-router-dom"

export const Redirect = (WrappedComponent: any) => (isAuth: boolean) => {
    //if (!isAuth) <Navigate to={'/login'} state replace/>
    return (
        <WrappedComponent/>
    )
}