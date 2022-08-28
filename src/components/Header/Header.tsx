import React from "react";
import {Link} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {logout} from "../../redux/AuthReducer";

export const Header = () => {
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)
    const avatar = useSelector<RootStateType, string | null>(state => state.profilePage?.profile?.photos?.large)

    const dispatch = useDispatch()

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const onLogoutClick = () => {
        dispatch(logout())
        handleCloseUserMenu()
    }

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt="Avatar" src={(isAuth && avatar) ? avatar :"/static/images/avatar/2.jpg"}/>
                </IconButton>
            </Tooltip>
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
                    <Typography textAlign="center"><Link to="/profile">Profile</Link></Typography>
                </MenuItem>
                <MenuItem onClick={onLogoutClick}>
                    <Typography textAlign="center"><Link to="/login">Logout</Link></Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}
