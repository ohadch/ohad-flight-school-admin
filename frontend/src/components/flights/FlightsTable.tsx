import {IFlight, IMember} from "../../@types";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MemberButton from "../members/MemberButton.tsx";

export interface FlightsTableProps {
    flights: IFlight[];
    students: IMember[];
    instructors: IMember[];
    onFlightCreate: () => void;
    onFlightEdit: (flight: IFlight) => void;
    onFlightDelete: (flight: IFlight) => void;
}

export default function FlightsTable(props : FlightsTableProps) {
    const {
        flights,
        students,
        instructors,
        onFlightCreate,
        onFlightEdit,
        onFlightDelete,
    } = props;

    const getStudentById = (id: number) => students.find(member => member.id === id);
    const getInstructorById = (id: number) => instructors.find(member => member.id === id);

    return (
        <Box>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                }}
            >
                <Toolbar>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onFlightCreate()}
                    >
                        New Flight
                    </Button>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="flights table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Student</TableCell>
                                <TableCell>Instructor</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Solo</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {flights.map((flight) => (
                                <TableRow key={flight.id}>
                                    <TableCell component="th" scope="row">
                                        {flight.id}
                                    </TableCell>
                                    <TableCell>{
                                        getStudentById(flight.student_id) && (
                                            <MemberButton member={getStudentById(flight.student_id)!} />
                                        )
                                    }</TableCell>
                                    <TableCell>{
                                        getInstructorById(flight.instructor_id) && (
                                            <MemberButton member={getInstructorById(flight.instructor_id)!} />
                                        )
                                    }</TableCell>
                                    <TableCell>{
                                        new Date(flight.date).toLocaleDateString("he-IL")
                                    }</TableCell>
                                    <TableCell>{flight.duration_hours}</TableCell>
                                    <TableCell>{flight.solo ? "Yes" : "No"}</TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            onClick={() => onFlightEdit(flight)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="warning"
                                            onClick={() => onFlightDelete(flight)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}