import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormGroup,
    FormControl
} from "@mui/material";
import React from "react";
import {IInstructionPlanCreate} from "../../@types/models/InstructionPlan";

export interface CreateInstructionPlanDialogProps {
    open: boolean
    onClose: () => void
    onInstructionPlanCreate: (data: IInstructionPlanCreate) => void
}

export default function CreateInstructionPlanDialog({open, onClose, onInstructionPlanCreate}: CreateInstructionPlanDialogProps) {
    const [name, setName] = React.useState("");

    return (
        <Dialog open={open}>
            <DialogTitle>Create Instruction Plan</DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: 400,
                }}
            >
                <FormGroup>
                    <FormControl>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={
                    () => {
                        onInstructionPlanCreate({
                            name,
                        });
                        onClose();
                    }
                }>Create</Button>
            </DialogActions>
        </Dialog>
    )
}