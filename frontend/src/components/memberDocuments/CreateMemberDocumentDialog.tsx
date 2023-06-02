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
import {IMemberDocumentCreate, MemberDocumentStatus, MemberDocumentType} from "../../@types/models/MemberDocument";

export interface CreateMemberDocumentDialogProps {
    open: boolean
    onClose: () => void
    onMemberDocumentCreate: (data: IMemberDocumentCreate) => void
}

export default function CreateMemberDocumentDialog({open, onClose, onMemberDocumentCreate}: CreateMemberDocumentDialogProps) {
    const [memberDocumentType, setMemberDocumentType] = React.useState<MemberDocumentType>(MemberDocumentType.MEDICAL);
    const [expirationAt, setExpirationAt] = React.useState<Date>(new Date());
    const [documentStatus, setDocumentStatus] = React.useState<MemberDocumentStatus>(MemberDocumentStatus.PENDING);

    return (
        <Dialog open={open}>
            <DialogTitle>Create Member Document</DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: 400,
                }}
            >
                <FormGroup
                    style={{
                        paddingTop: 5,
                    }}
                >
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
                    <FormControl>
                        <InputLabel id="member-document-status-label">Document Status</InputLabel>
                        <Select
                            labelId="member-document-status-label"
                            id="member-document-status"
                            value={documentStatus}
                            label="Document Status"
                            onChange={(e) => setDocumentStatus(e.target.value as MemberDocumentStatus)}
                        >
                            {Object.values(MemberDocumentStatus).map((status) => (
                                <MenuItem key={status} value={status}>{status}</MenuItem>
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
                            expiration_at: expirationAt.toISOString(),
                            status: documentStatus,
                        });
                        onClose();
                    }
                }>Create</Button>
            </DialogActions>
        </Dialog>
    )
}