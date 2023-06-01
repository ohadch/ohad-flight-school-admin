import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormGroup,
    FormControl, MenuItem, Select, InputLabel
} from "@mui/material";
import React from "react";
import {getDisplayNameByMemberDocumentType} from "../../utils/memberDocuments.ts";
import {IMemberDocumentCreate, MemberDocumentType} from "../../@types/models/MemberDocument";

export interface CreateMemberDocumentDialogProps {
    open: boolean
    onClose: () => void
    onMemberDocumentCreate: (data: IMemberDocumentCreate) => void
}

export default function CreateMemberDocumentDialog({open, onClose, onMemberDocumentCreate}: CreateMemberDocumentDialogProps) {
    const [memberDocumentType, setMemberDocumentType] = React.useState<MemberDocumentType>(MemberDocumentType.MEDICAL);
    const [expirationAt, setExpirationAt] = React.useState<Date>(new Date());

    return (
        <Dialog open={open}>
            <DialogTitle>Create Member Document</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <FormControl>
                        <InputLabel id="member-document-type-label">Document Type</InputLabel>
                        <Select
                            labelId="member-document-type-label"
                            id="member-document-type"
                            value={memberDocumentType}
                            label="Document Type"
                            onChange={(e) => setMemberDocumentType(e.target.value as MemberDocumentType)}
                        >
                            {Object.values(MemberDocumentType).map((type) => (
                                <MenuItem key={type} value={type}>{getDisplayNameByMemberDocumentType(type)}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <TextField
                        label="Expiration Date"
                        type="date"
                        value={expirationAt.toISOString().split("T")[0]}
                        onChange={(e) => setExpirationAt(new Date(e.target.value))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={
                    () => {
                        onMemberDocumentCreate({
                            type: memberDocumentType,
                            expiration_at: expirationAt
                        });
                        onClose();
                    }
                }>Create</Button>
            </DialogActions>
        </Dialog>
    )
}