import {ModelApi} from "./modelApi.service.ts";
import {IMember, IMemberCreate, IMemberUpdate} from "../../@types";

class MemberApiService extends ModelApi<IMember, IMemberCreate, IMemberUpdate> {
    constructor() {
        super("/members");
    }
}

export const memberApiService = new MemberApiService();