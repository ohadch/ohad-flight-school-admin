import {ModelApi} from "./modelApi.service.ts";
import {IStudent} from "../../@types";

export class StudentApiService extends ModelApi<IStudent> {
    constructor() {
        super("/students");
    }
}