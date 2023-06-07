import {ModelApi} from "./modelApi.service.ts";
import {IDemonstration, IDemonstrationCreate, IDemonstrationUpdate} from "../../@types";
import axios from "axios";

class DemonstrationsApiService extends ModelApi<IDemonstration, IDemonstrationCreate, IDemonstrationUpdate> {
    constructor() {
        super("/demonstrations");
    }

    async getDemonstrationsByEnrollmentId(enrollmentId: number): Promise<IDemonstration[]> {
        const response = await axios.get<IDemonstration[]>(`${this.API_URL}${this.endpoint}/?enrollment_id=${enrollmentId}`);
        return response.data;
    }
}

export const demonstrationsApiService = new DemonstrationsApiService();