import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {getUserProfile, getUserStatus, updateStatus, userProfile} from "../../redux/ProfilePageReducer";
import {Profile} from "./Profile";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../common/WithAuthRedirect/WithAuthRedirect";
import {compose} from "redux";

export type ProfileType = {
    getUserProfile: (userId: number | undefined) => void
    getUserStatus: (userId: number | undefined) => void
    updateStatus: (status: string) => void
    profile: userProfile
    status: string
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
        this.props.getUserProfile(Number(userId))
        this.props.getUserStatus(Number(userId))
    }

    render() {
        return (
            <div>
                <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateType): { profile: userProfile | null, status: string } => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export default compose<ComponentType>(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateStatus})
)(ProfileContainer)
