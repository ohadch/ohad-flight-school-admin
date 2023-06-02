import {ModelApi} from "./modelApi.service.ts";
import {IInstructionPlan, IInstructionPlanCreate, IInstructionPlanUpdate} from "../../@types/models/InstructionPlan";

class SyllabusesApiService extends ModelApi<IInstructionPlan, IInstructionPlanCreate, IInstructionPlanUpdate> {
    constructor() {
        super("/syllabuses");
    }
}

export const syllabusesApiService = new SyllabusesApiService();