import {Grid} from "@mui/material";
import {useEffect, useState} from "react";
import InstructionPlanSyllabusesTable from "./InstructionPlanSyllabusesTable.tsx";
import {instructionPlansApiService} from "../../services/api/instructionPlansApi.service.ts";
import {IInstructionPlan, ISyllabus} from "../../@types";
import InstructionPlanAddSyllabusDialog from "./InstructionPlanAttachSyllabusDialog.tsx";

export interface InstructionPlanSyllabusesContainerProps {
    instructionPlan: IInstructionPlan;
}

export default function InstructionPlanSyllabusesContainer(props: InstructionPlanSyllabusesContainerProps) {
    const {instructionPlan} = props;
    const [syllabuses, setSyllabuses] = useState<ISyllabus[] | null>(null);
    const [attachSyllabusDialogOpen, setAttachSyllabusDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!syllabuses) {
            instructionPlansApiService.getSyllabusesByInstructionPlanId(
                instructionPlan.id
            ).then((syllabuses) => {
                setSyllabuses(syllabuses);
            });
        }
    })

    const onSyllabusAdded = (syllabus: ISyllabus) => {
        instructionPlansApiService.addSyllabusToInstructionPlan(
            instructionPlan.id,
            syllabus.id
        ).then(() => {
            setSyllabuses([
                ...(syllabuses || []),
                syllabus
            ])
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    const onSyllabusRemoved = (syllabus: ISyllabus) => {
        if (!confirm(`Are you sure you want to remove syllabus "${syllabus.name}" from instruction plan "${instructionPlan.name}"?`)) {
            return
        }
        
        instructionPlansApiService.removeSyllabusFromInstructionPlan(
            instructionPlan.id,
            syllabus.id
        ).then(() => {
            setSyllabuses(
                (syllabuses || []).filter((s) => s.id !== syllabus.id)
            )
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    return (
        <>
            <InstructionPlanAddSyllabusDialog
                open={attachSyllabusDialogOpen}
                onSyllabusAttach={onSyllabusAdded}
                onClose={() => setAttachSyllabusDialogOpen(false)}
                instructionPlanSyllabuses={syllabuses || []}
            />
            <Grid container spacing={2}>
                <InstructionPlanSyllabusesTable
                    onOpenAddSyllabusDialog={() => setAttachSyllabusDialogOpen(true)}
                    onSyllabusRemove={onSyllabusRemoved}
                    syllabuses={syllabuses || []}
                />
            </Grid>
        </>
    )
}