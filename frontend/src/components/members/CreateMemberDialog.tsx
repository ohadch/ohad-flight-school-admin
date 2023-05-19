import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import React from "react";

export interface CreateMemberDialogProps {
    open: boolean
    onClose: () => void
    onMemberCreate: (name: string) => void
}

export default function CreateMemberDialog({ open, onClose, onMemberCreate }: CreateMemberDialogProps) {
    const [newMemberName, setNewMemberName] = React.useState<string>("");

  return (
    <Dialog open={open}>
        <DialogTitle>Create Member</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To create a new member, please enter a name here.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Member Name"
                type="text"
                fullWidth
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={
                () => {
                    onMemberCreate(newMemberName);
                    setNewMemberName("");
                    onClose();
                }
            }>Create</Button>
        </DialogActions>
    </Dialog>
  )
}