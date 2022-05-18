import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {getUserProfile, getUserStatus, updateStatus, userProfile} from "../../redux/ProfilePageReducer";
import {Profile} from "./Profile";
import {withAuthRedirect} from "../common/WithAuthRedirect/WithAuthRedirect";
import {compose} from "redux";
import {PathParamsType, withRouter} from "../common/withRouter/withRouterHOC";

export type ProfileType = {
    getUserProfile: (userId: number | undefined) => void
    getUserStatus: (userId: number | undefined) => void
    updateStatus: (status: string) => void
    profile: userProfile
    status: string
    params: PathParamsType
    isAuth: boolean
    authorizedUserId: number
}

export class ProfileContainer extends React.Component<ProfileType> {
    componentDidMount() {
        let userId = Number(this.props.params.userId)
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <div>
                <Profile profile={this.props.profile} status={this.props.status}
                         updateStatus={this.props.updateStatus}/>
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateType): { profile: userProfile | null, status: string,
    isAuth: boolean, authorizedUserId: number | null } => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.userId
    }
}

export default compose<ComponentType>(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateStatus})
)(ProfileContainer)
