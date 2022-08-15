import {userProfile} from "../../../../redux/ProfilePageReducer";
import React, {useState} from "react";
import {Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import {red} from "@mui/material/colors";
import {Contact} from "../Contacts/Contacts";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from "@mui/material/Box";

export const ProfileData = ({
                                profile
                            }: { profile: userProfile, isOwner: boolean }) => {
    const [open, setOpen] = useState(false);

    return <>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableBody>
                    <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            About me:
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {profile.aboutMe}
                        </TableCell>
                    </TableRow>
                    <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            Looking for a job:
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {profile.lookingForAJob ? <CheckCircleIcon color='success'/> :
                                <CloseIcon sx={{color: red}}/>}
                        </TableCell>
                    </TableRow>
                    {profile.lookingForAJobDescription && <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            My professional skills:
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {profile.lookingForAJobDescription}
                        </TableCell>
                    </TableRow>}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Contacts
                        </TableCell>
                        <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{margin: 1}}>
                                    <Table>
                                        <TableBody>
                                            {(Object.keys(profile.contacts) as (keyof typeof profile.contacts)[]).map((key) =>
                                                profile.contacts[key] &&
                                                <Contact key={key} contactTitle={key}
                                                         contactValue={profile.contacts[key]}/>
                                            )}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>
}