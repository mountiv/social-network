import {useParams} from "react-router-dom";
import React from "react";
import {ProfileContainer, ProfileType} from "../../Profile/ProfileContainer";

export type PathParamsType = {
    userId?: string
}

export const withRouter = (WrappedComponent: typeof ProfileContainer) => (props: any) => {
    const params = useParams<PathParamsType>()
    return (
        <WrappedComponent {...props} params={params}/>
    )
}