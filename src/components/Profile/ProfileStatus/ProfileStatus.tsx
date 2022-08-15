import { TextField } from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import s from './ProfileStatus.module.css'

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode
                ?
                <div>
                    <span onDoubleClick={() => setEditMode(true)}>{status || 'Enter your status'}</span>
                </div>
                :
                <div>
                    <TextField variant="standard" placeholder={'Enter status'} onChange={onStatusChange}
                           autoFocus onBlur={deactivateEditMode} value={status}/>
                </div>}
        </div>
    )

}
