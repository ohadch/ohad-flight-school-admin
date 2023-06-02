import {ModelApi} from "./modelApi.service.ts";
import axios from "axios";
import {IInstructionPlan, IInstructionPlanCreate, IInstructionPlanUpdate, ISyllabus} from "../../@types";

class InstructionPlansApiService extends ModelApi<IInstructionPlan, IInstructionPlanCreate, IInstructionPlanUpdate> {
    constructor() {
        super("/instruction_plans");
    }

    async getSyllabusesByInstructionPlanId(id: number): Promise<ISyllabus[]> {
        const response = await axios.get<ISyllabus[]>(`${this.API_URL}${this.endpoint}/${id}/syllabuses`);
        return response.data;
    }

    async addSyllabusToInstructionPlan(id: number, syllabusId: number): Promise<ISyllabus[]> {
        const response = await axios.post<ISyllabus[]>(
            `${this.API_URL}${this.endpoint}/${id}/syllabuses?syllabus_id=${syllabusId}`,
        );
        return response.data;
    }

    async removeSyllabusFromInstructionPlan(id: number, syllabusId: number): Promise<ISyllabus[]> {
        const response = await axios.delete<ISyllabus[]>(
            `${this.API_URL}${this.endpoint}/${id}/syllabuses?syllabus_id=${syllabusId}`,
        );
        return response.data;
    }
}

export const instructionPlansApiService = new InstructionPlansApiService();