import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, FormControlLabel, Checkbox, FormGroup } from "@mui/material";
import React from "react";
import { IMemberCreate } from "../../@types";

export interface CreateMemberDialogProps {
    open: boolean
    onClose: () => void
    onMemberCreate: (data: IMemberCreate) => void
}

export default function CreateMemberDialog({ open, onClose, onMemberCreate }: CreateMemberDialogProps) {
    const [newMemberName, setNewMemberName] = React.useState<string>("");
    const [memberQualifications, setMemberQualifications] = React.useState({
        isBeforeSoloStudent: true,
        isSoloStudent: false,
        isPrivatePilot: false,
        isCfi: false,
    });

    return (
        <Dialog open={open}>
            <DialogTitle>Create Member</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the name of the new member.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                />
                <DialogContentText>
                    Select the qualifications of the new member.
                </DialogContentText>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={memberQualifications.isBeforeSoloStudent}
                                onChange={(e) => setMemberQualifications({ ...memberQualifications, isBeforeSoloStudent: e.target.checked })}
                                name="isBeforeSoloStudent"
                                color="primary"
                            />
                        }
                        label="Before Solo Student"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={memberQualifications.isSoloStudent}
                                onChange={(e) => setMemberQualifications({ ...memberQualifications, isSoloStudent: e.target.checked })}
                                name="isSoloStudent"
                                color="primary"
                            />
                        }
                        label="Solo Student"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={memberQualifications.isPrivatePilot}
                                onChange={(e) => setMemberQualifications({ ...memberQualifications, isPrivatePilot: e.target.checked })}
                                name="isPrivatePilot"
                                color="primary"
                            />
                        }
                        label="Private Pilot"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={memberQualifications.isCfi}
                                onChange={(e) => setMemberQualifications({ ...memberQualifications, isCfi: e.target.checked })}
                                name="isCfi"
                                color="primary"
                            />
                        }
                        label="CFI"
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={
                    () => {
                        onMemberCreate({
                            name: newMemberName,
                            is_before_solo_student: memberQualifications.isBeforeSoloStudent,
                            is_solo_student: memberQualifications.isSoloStudent,
                            is_private_pilot: memberQualifications.isPrivatePilot,
                            is_cfi: memberQualifications.isCfi,
                        });
                        setNewMemberName("");
                        onClose();
                    }
                }>Create</Button>
            </DialogActions>
        </Dialog>
    )
}