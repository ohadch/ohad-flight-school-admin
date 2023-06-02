import {ModelApi} from "./modelApi.service.ts";
import {IInstructionPlan, IInstructionPlanCreate, IInstructionPlanUpdate} from "../../@types/models/InstructionPlan";

class InstructionPlansApiService extends ModelApi<IInstructionPlan, IInstructionPlanCreate, IInstructionPlanUpdate> {
    constructor() {
        super("/instruction_plans");
    }
}

export const instructionPlansApiService = new InstructionPlansApiService();