import {IDemonstration, ISyllabusItem} from "../../@types";
import {Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Box from "@mui/material/Box";

export interface EnrollmentSyllabusTableProps {
    items: ISyllabusItem[];
    demonstrations: IDemonstration[];
}

export default function EnrollmentSyllabusTable(props: EnrollmentSyllabusTableProps) {
    const {items, demonstrations} = props;

    function renderSyllabusItemStatus(item: ISyllabusItem) {
        if (!demonstrations) {
            return null;
        }

        const sufficientDemonstrationExists = demonstrations
            .some((demonstration) => (
                demonstration.syllabus_item_id === item.id
                && demonstration.sufficient
            ))

        if (sufficientDemonstrationExists) {
            return (
                <Chip
                    label="Completed"
                    color="success"
                />
            )
        }

        return (
            <Chip
                label="Incomplete"
                color="error"
            />
        )
    }

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
                                <TableCell align="right">Completed</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {renderSyllabusItemStatus(item)}
                                    </TableCell>
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