import {ModelApi} from "./modelApi.service.ts";
import {IFlight, IFlightCreate, IFlightUpdate} from "../../@types";

class FlightsApiService extends ModelApi<IFlight, IFlightCreate, IFlightUpdate> {
    constructor() {
        super("/flights");
    }
}

export const flightsApiService = new FlightsApiService();