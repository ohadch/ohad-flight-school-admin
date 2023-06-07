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
import {IFlightCreate, IMember} from "../../@types";

export interface CreateFlightDialogProps {
    open: boolean
    onClose: () => void
    onFlightCreate: (data: IFlightCreate) => void
    students: IMember[]
    instructors: IMember[]
}

export default function CreateFlightDialog(props: CreateFlightDialogProps) {
    const {
        open,
        onClose,
        onFlightCreate,
        students,
        instructors
    } = props;

    const [date, setDate] = React.useState<Date | null>(
        new Date()
    );
    const [student, setStudent] = React.useState<IMember | null>(null);
    const [instructor, setInstructor] = React.useState<IMember | null>(null);
    const [solo, setSolo] = React.useState<boolean>(false);
    const [durationHours, setDurationHours] = React.useState<number>(0);

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
                            value={student?.id || ""}
                            label="Student"
                            onChange={(e) => {
                                const member = students.find((_student) => _student.id === e.target.value);
                                setStudent(member || null);
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
                            value={instructor?.id || ""}
                            label="Instructor"
                            onChange={(e) => {
                                const member = instructors.find((_instructor) => _instructor.id === e.target.value);
                                setInstructor(member || null);
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
                            value={date ? date.toISOString().split("T")[0] : ""}
                            onChange={(e) => setDate(new Date(e.target.value))}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel id="solo-label">Solo</InputLabel>
                        <Select
                            labelId="solo-label"
                            id="solo"
                            value={solo ? "Yes" : "No"}
                            label="Solo"
                            onChange={(e) => setSolo(e.target.value == "Yes")}
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
                            value={durationHours}
                            onChange={(e) => setDurationHours(parseFloat(e.target.value))}
                        />
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    disabled={!student || !instructor || !date || !durationHours || durationHours == 0}
                    onClick={
                        () => {
                            if (!student || !instructor || !date) {
                                return;
                            }

                            onFlightCreate({
                                student_id: student.id,
                                instructor_id: instructor.id,
                                date: date.toISOString(),
                                solo,
                                duration_hours: durationHours,
                            });
                            onClose();
                        }
                    }>Create</Button>
            </DialogActions>
        </Dialog>
    )
}