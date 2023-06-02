import {useParams} from "react-router-dom";
import {IInstructionPlan} from "../../@types";
import {useEffect, useState} from "react";
import InstructionPlanSyllabusesContainer
    from "../../components/instructionPlanSyllabuses/InstructionPlanSyllabusesContainer.tsx";
import {instructionPlansApiService} from "../../services/api/instructionPlansApi.service.ts";

export default function InstructionPlanPage() {
    const {id} = useParams();
    const [instructionPlan, setInstructionPlan] = useState<IInstructionPlan | null>(null);
    const instructionPlanId = parseFloat(id as string)

    useEffect(() => {
        if (!instructionPlan) {
            instructionPlansApiService.getById(instructionPlanId).then((instructionPlan) => {
                setInstructionPlan(instructionPlan);
            });
        }
    })

    if (!instructionPlan) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{instructionPlan.name}</h1>
            <InstructionPlanSyllabusesContainer
                instructionPlan={instructionPlan}
            />
        </div>
    )
}