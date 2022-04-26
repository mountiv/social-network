import React from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {getUserProfile, setUserProfile, userProfile} from "../../redux/ProfilePageReducer";
import {Profile} from "./Profile";
import {useParams} from "react-router-dom";

export type ProfileType = {
    getUserProfile: (userId: string | undefined) => void
    profile: userProfile
    params: PathParamsType
}

type PathParamsType = {
    userId?: string
}

const withRouter = (WrappedComponent: typeof ProfileContainer) => (props: Omit<ProfileType, 'params'>) => {
    const params = useParams<PathParamsType>()
    return (
        <WrappedComponent {...props} params={params}/>
    )
}

export class ProfileContainer extends React.Component<ProfileType> {
    componentDidMount() {
        let userId = this.props.params.userId
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <div>
                <Profile profile={this.props.profile}/>
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateType): { profile: userProfile } => {
    return {
        profile: state.profilePage.profile
    }
}

const WithRouterProfileComponent = withRouter(ProfileContainer)

export const ProfileC = connect(mapStateToProps, {getUserProfile})(WithRouterProfileComponent)