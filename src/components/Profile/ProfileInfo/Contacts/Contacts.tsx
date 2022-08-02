import {Table, TableBody, TableRow, TableCell} from "@mui/material";

type ContactsType = {
    contactTitle: string
    contactValue: string | null
}

export const Contact = (props: ContactsType) => {
    return (
        <Table>
            <TableBody>
                <TableRow
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row"><b>{props.contactTitle}</b></TableCell>
                    <TableCell component="th" scope="row">{props.contactValue} </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}