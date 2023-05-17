import {ModelApi} from "./modelApi.service.ts";
import {IMember} from "../../@types";

export class MemberApiService extends ModelApi<IMember> {
    constructor() {
        super("/members");
    }
}