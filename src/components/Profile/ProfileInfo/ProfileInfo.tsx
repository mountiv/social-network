import React, {ChangeEvent} from "react";
import {ProfileType} from "../Profile";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";
import {ProfileData} from "./ProfileData/ProfileData";
import {userProfile} from "../../../redux/ProfilePageReducer";
import s from './ProfileInfo.module.css'
import {ProfileDataFormik} from "./ProfileData/ProfileDataFormik";
import {Button, CircularProgress, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Menu from "@mui/material/Menu";


export const ProfileInfo = (props: ProfileType) => {
    const profile = {...props.profile, contacts: {...props.profile.contacts}, photos: {...props.profile.photos}}

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: userProfile) => {
        props.saveSubmit(formData)
    }

    if (!props.profile) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className={s.wrapper}>
            <div className={s.avaBlock}>
                {profile.photos.large &&
                    <Tooltip title="Change avatar">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <img className={s.ava} alt={'Photo'} src={profile.photos.large}/>
                        </IconButton>
                    </Tooltip>
                }

                {props.isOwner &&
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                <label className={s.labelPhoto}>
                                    <input type="file" title={'Change avatar'} onChange={onAddPhoto}
                                           className={s.inputPhoto}/>
                                    Change Avatar
                                </label>
                            </Typography>
                        </MenuItem>
                    </Menu>

                }
                {!props.profileEdit && <div>{props.isOwner && <Button variant="contained"
                                                                      onClick={() => props.setProfileEdit(!props.profileEdit)}>{'Edit Profile'}</Button>}</div>}
            </div>
            <div style={{width: '100%'}}>
                <b>{profile.fullName}</b>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <br/>
                {props.profileEdit
                    ? <ProfileDataFormik
                        initialValues={profile}
                        onSubmit={onSubmit}/>
                    : <>
                        <ProfileData profile={profile} isOwner={props.isOwner}/>
                    </>
                }

            </div>
        </div>
    )
}
