import InstructionPlansTable from "../../components/instructionPlans/InstructionPlansTable.tsx";
import {IInstructionPlan, IInstructionPlanCreate} from "../../@types/models/InstructionPlan";
import {useEffect, useState} from "react";
import {instructionPlansApiService} from "../../services/api/instructionPlansApi.service.ts";
import CreateInstructionPlanDialog from "../../components/instructionPlans/CreateInstructionPlanDialog.tsx";
import EditInstructionPlanDialog from "../../components/instructionPlans/EditInstructionPlanDialog.tsx";

export default function InstructionPlansPage() {
    const [instructionPlans, setInstructionPlans] = useState<IInstructionPlan[] | null>(null);
    const [createInstructionPlanDialogOpen, setCreateInstructionPlanDialogOpen] = useState<boolean>(false);
    const [currentlyEditedInstructionPlan, setCurrentlyEditedInstructionPlan] = useState<IInstructionPlan | null>(null);

    useEffect(() => {
        if (!instructionPlans) {
            instructionPlansApiService.get().then((instructionPlans) => {
                setInstructionPlans(instructionPlans);
            })
        }
    })

    const createInstructionPlan = (data: IInstructionPlanCreate) => {
        instructionPlansApiService.create(data).then((instructionPlan) => {
            setInstructionPlans([...(instructionPlans || []), instructionPlan]);
        })
    }

    const updateInstructionPlan = (data: IInstructionPlan) => {
        instructionPlansApiService.update(data.id, {
            name: data.name,
        }).then((instructionPlan) => {
            setInstructionPlans((instructionPlans || []).map((d) => {
                if (d.id === instructionPlan.id) {
                    return instructionPlan;
                }

                return d;
            }));
        })
    }

    const deleteInstructionPlan = (data: IInstructionPlan) => {
        if (!confirm(`Are you sure you want to delete instruction plan "${data.name}"?`)) {
            return;
        }

        instructionPlansApiService.delete(data.id).then(() => {
            setInstructionPlans((instructionPlans || []).filter((d) => {
                return d.id !== data.id;
            }));
        })
    }

    return (
        <>
            <CreateInstructionPlanDialog
                open={createInstructionPlanDialogOpen}
                onClose={() => setCreateInstructionPlanDialogOpen(false)}
                onInstructionPlanCreate={createInstructionPlan}
            />
            {currentlyEditedInstructionPlan && (
                <EditInstructionPlanDialog
                    open={!!currentlyEditedInstructionPlan}
                    onClose={() => setCurrentlyEditedInstructionPlan(null)}
                    instructionPlan={currentlyEditedInstructionPlan}
                    onInstructionPlanUpdate={updateInstructionPlan}
                />
            )}
            <InstructionPlansTable
                instructionPlans={instructionPlans || []}
                onInstructionPlanCreate={() => setCreateInstructionPlanDialogOpen(true)}
                onInstructionPlanEdit={(instructionPlan) => setCurrentlyEditedInstructionPlan(instructionPlan)}
                onInstructionPlanDelete={deleteInstructionPlan}
            />
        </>
    )
}