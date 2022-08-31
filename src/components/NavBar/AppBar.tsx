import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import {NavLink} from "react-router-dom";
import {Header} from "../Header/Header";
import s from "./NavBar.module.css"

const pages = [<NavLink className={s.link} to="/users">Users</NavLink>, <NavLink className={s.link}  to="/chat">Chat</NavLink>];

const ResponsiveAppBar = () => {
    return (
        <AppBar position="static" sx={{marginBottom: 3}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#/profile"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Social Network
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'inherit', md: 'flex'}}}>
                        {pages.map((page, key) => (
                            <Button
                                key={key}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Header/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
