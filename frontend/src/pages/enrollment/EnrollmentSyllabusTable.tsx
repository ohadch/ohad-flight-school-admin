import {ISyllabusItem} from "../../@types";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Box from "@mui/material/Box";

export interface EnrollmentSyllabusProgressProps {
    items: ISyllabusItem[];
}

export default function EnrollmentSyllabusTable(props: EnrollmentSyllabusProgressProps) {
    const {items} = props;

    return (
        <Box>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="enrollment syllabus table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="right">TBD</TableCell>
                                    <TableCell align="right">TBD</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}