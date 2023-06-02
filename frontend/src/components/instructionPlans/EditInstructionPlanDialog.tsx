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
import {IInstructionPlan} from "../../@types/models/InstructionPlan";

export interface CreateInstructionPlanDialogProps {
    open: boolean
    onClose: () => void
    instructionPlan: IInstructionPlan
    onInstructionPlanUpdate: (data: IInstructionPlan) => void
}

export default function EditInstructionPlanDialog(props: CreateInstructionPlanDialogProps) {
    const {open, onClose, instructionPlan, onInstructionPlanUpdate} = props;

    const [editedInstructionPlan, setEditedInstructionPlan] = React.useState<IInstructionPlan>({
        ...instructionPlan
    });

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
                            value={editedInstructionPlan.name}
                            onChange={(e) => setEditedInstructionPlan({
                                ...editedInstructionPlan,
                                name: e.target.value
                            })}
                        />
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={
                    () => {
                        onInstructionPlanUpdate(editedInstructionPlan);
                        onClose();
                    }
                }>Update</Button>
            </DialogActions>
        </Dialog>
    )
}