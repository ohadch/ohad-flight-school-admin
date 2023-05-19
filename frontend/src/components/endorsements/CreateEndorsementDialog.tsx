import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import React from "react";

export interface CreateEndorsementDialogProps {
    open: boolean
    onClose: () => void
    onEndorsementCreate: (name: string) => void
}

export default function CreateEndorsementDialog({ open, onClose, onEndorsementCreate }: CreateEndorsementDialogProps) {
    const [newEndorsementName, setNewEndorsementName] = React.useState<string>("");

  return (
    <Dialog open={open}>
        <DialogTitle>Create Endorsement</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To create a new endorsement, please enter a name here.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Endorsement Name"
                type="text"
                fullWidth
                value={newEndorsementName}
                onChange={(e) => setNewEndorsementName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={
                () => {
                    onEndorsementCreate(newEndorsementName);
                    setNewEndorsementName("");
                    onClose();
                }
            }>Create</Button>
        </DialogActions>
    </Dialog>
  )
}