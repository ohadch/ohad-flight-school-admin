import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormGroup,
    FormControl, MenuItem, Select, InputLabel, TextField
} from "@mui/material";
import React from "react";
import {IFlight, IFlightUpdate, IMember} from "../../@types";

export interface EditFlightDialogProps {
    open: boolean
    onClose: () => void
    onFlightUpdate: (data: IFlightUpdate) => void
    students: IMember[]
    instructors: IMember[]
    flight: IFlight
}


export default function EditFlightDialog(props: EditFlightDialogProps) {
    const {
        open,
        onClose,
        onFlightUpdate,
        students,
        instructors
    } = props;

    const [editedFlight, setEditedFlight] = React.useState<IFlight>({
        ...props.flight,
    });

    return (
        <Dialog open={open}>
            <DialogTitle>Create Flight</DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: 600,
                }}
            >
                <FormGroup
                    style={{
                        paddingTop: 5,
                    }}
                >
                    <FormControl>
                        <InputLabel id="student-label">Member</InputLabel>
                        <Select
                            labelId="student-label"
                            id="student"
                            value={editedFlight.student_id}
                            label="Student"
                            onChange={(e) => {
                                setEditedFlight({
                                    ...editedFlight,
                                    student_id: parseInt(e.target.value as string),
                                });
                            }}
                        >
                            {students.map((_student) => (
                                <MenuItem key={_student.id} value={_student.id}>{_student.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel id="instructor-label">Instructor</InputLabel>
                        <Select
                            labelId="instructor-label"
                            id="instructor"
                            value={editedFlight.instructor_id}
                            label="Instructor"
                            onChange={(e) => {
                                setEditedFlight({
                                    ...editedFlight,
                                    instructor_id: parseInt(e.target.value as string),
                                });
                            }}
                        >
                            {instructors.map((_instructor) => (
                                <MenuItem key={_instructor.id} value={_instructor.id}>{_instructor.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            label="Date"
                            type="date"
                            fullWidth
                            value={new Date(editedFlight.date).toISOString().split("T")[0]}
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                setEditedFlight({
                                    ...editedFlight,
                                    date: date.toISOString()
                                });
                            }}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel id="solo-label">Solo</InputLabel>
                        <Select
                            labelId="solo-label"
                            id="solo"
                            value={editedFlight.solo ? "Yes" : "No"}
                            label="Solo"
                            onChange={(e) => {
                                setEditedFlight({
                                    ...editedFlight,
                                    solo: e.target.value === "Yes",
                                });
                            }}
                        >
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="durationHours"
                            label="Duration Hours"
                            type="number"
                            fullWidth
                            value={editedFlight.duration_hours}
                            onChange={(e) => {
                                setEditedFlight({
                                    ...editedFlight,
                                    duration_hours: parseInt(e.target.value),
                                });
                            }}
                        />
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    disabled={editedFlight.duration_hours == 0}
                    onClick={
                        () => {
                            onFlightUpdate({
                                student_id: editedFlight.student_id,
                                instructor_id: editedFlight.instructor_id,
                                date: editedFlight.date,
                                solo: editedFlight.solo,
                                duration_hours: editedFlight.duration_hours,
                            });
                            onClose();
                        }
                    }>Create</Button>
            </DialogActions>
        </Dialog>
    )
}