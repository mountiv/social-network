import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {
    getUserProfile,
    getUserStatus,
    savePhoto,
    saveSubmit, setProfileEdit,
    updateStatus,
    userProfile
} from "../../redux/ProfilePageReducer";
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
    savePhoto: (photo: string) => void
    saveSubmit: (value:  userProfile ) => void
    setProfileEdit: (profileEdit: boolean) => void
    profileEdit: boolean
}

export class ProfileContainer extends React.Component<ProfileType> {
    refreshProfile() {
        let userId = Number(this.props.params.userId)
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.params.userId !== prevProps.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile savePhoto={this.props.savePhoto}
                         profile={this.props.profile}
                         isOwner={!this.props.params.userId}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         saveSubmit={this.props.saveSubmit}
                         setProfileEdit = {this.props.setProfileEdit}
                         profileEdit={this.props.profileEdit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateType): {
    profile: userProfile | null, status: string,
    isAuth: boolean, authorizedUserId: number | null, profileEdit: boolean
} => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.userId,
        profileEdit: state.profilePage.profileEdit
    }
}

export default compose<ComponentType>(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateStatus, savePhoto, saveSubmit, setProfileEdit})
)(ProfileContainer)
