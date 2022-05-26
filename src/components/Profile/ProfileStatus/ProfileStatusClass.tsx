import React, {ChangeEvent} from "react";
import s from './ProfileStatus.module.css'
import {userProfile} from "../../../redux/ProfilePageReducer";
import {Preloader} from "../../common/Preloader/Preloader";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatusClass extends React.Component <ProfileStatusType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusType, prevState: { status: string, editMode: boolean }) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '---------'}</span>
                    </div>
                    :
                    <div>
                        <input onChange={this.onStatusChange}
                               autoFocus onBlur={this.deactivateEditMode} value={this.state.status}/>
                    </div>}
            </div>
        )
    }
}
