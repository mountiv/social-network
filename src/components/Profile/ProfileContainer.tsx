import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {setUserProfile, userProfile} from "../../redux/ProfilePageReducer";
import {Profile} from "./Profile";
import {useParams} from "react-router-dom";

export type ProfileType = {
    setUserProfile: (profile: userProfile) => void
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Profile {...this.props}/>
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

export const ProfileC = connect(mapStateToProps, {setUserProfile})(WithRouterProfileComponent)