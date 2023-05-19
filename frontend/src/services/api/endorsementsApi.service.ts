import {ModelApi} from "./modelApi.service.ts";
import {IEndorsement, IEndorsementCreate, IEndorsementUpdate} from "../../@types";

class EndorsementApiService extends ModelApi<IEndorsement, IEndorsementCreate, IEndorsementUpdate> {
    constructor() {
        super("/endorsements");
    }
}

export const endorsementApiService = new EndorsementApiService();