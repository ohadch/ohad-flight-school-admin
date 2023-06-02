import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormGroup,
    FormControl, MenuItem, Select, InputLabel
} from "@mui/material";
import {useEffect, useState} from "react";
import {ISyllabus} from "../../@types";
import {syllabusesApiService} from "../../services/api/syllabusesApi.service.ts";

export interface InstructionPlanAttachSyllabusDialogProps {
    open: boolean
    onClose: () => void
    onSyllabusAttach: (syllabusId: ISyllabus) => void
    instructionPlanSyllabuses: ISyllabus[]
}


export default function InstructionPlanAttachSyllabusDialog(props: InstructionPlanAttachSyllabusDialogProps) {
    const {open, onClose, onSyllabusAttach, instructionPlanSyllabuses} = props;
    const [allSyllabuses, setAllSyllabuses] = useState<ISyllabus[] | null>(null);
    const [attachedSyllabus, setAttachedSyllabus] = useState<ISyllabus | null>(null);

    useEffect(() => {
        if (!allSyllabuses) {
            syllabusesApiService.get().then((syllabuses) => {
                setAllSyllabuses(syllabuses);
            });
        }
    })

    const availableSyllabuses = allSyllabuses?.filter((syllabus) => {
        return !instructionPlanSyllabuses.find((instructionPlanSyllabus) => {
            return instructionPlanSyllabus.id === syllabus.id;
        });
    }) || [];

    return (
        <Dialog open={open}>
            <DialogTitle>Attach Syllabus to Instruction Plan</DialogTitle>
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
                        <InputLabel id="attached-syllabus-label">Syllabus</InputLabel>
                        <Select
                            labelId="attached-syllabus-label"
                            id="attached-syllabus"
                            value={attachedSyllabus?.id || ""}
                            label="Syllabus"
                            onChange={(e) => {
                                const syllabusId = e.target.value as number;
                                const syllabus = availableSyllabuses.find((syllabus) => syllabus.id === syllabusId);
                                setAttachedSyllabus(syllabus || null);
                            }}
                        >
                            {availableSyllabuses.map((syllabus) => (
                                <MenuItem key={syllabus.id} value={syllabus.id}>{syllabus.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    disabled={!attachedSyllabus}
                    onClick={
                        () => {
                            if (attachedSyllabus) {
                                onSyllabusAttach(attachedSyllabus);
                                onClose();
                            }
                        }
                    }>Attach</Button>
            </DialogActions>
        </Dialog>
    )
}