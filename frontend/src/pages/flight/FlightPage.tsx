import {useParams} from "react-router-dom";
import {IFlight} from "../../@types";
import {useEffect, useState} from "react";
import {flightsApiService} from "../../services/api";
import DemonstrationsTable from "../../components/demonstrations/DemonstrationsTable.tsx";
import FlightDemonstrationsTableContainer from "../../components/flights/FlightDemonstrationsTableContainer.tsx";

export default function FlightPage() {
    const {id} = useParams();
    const [flight, setFlight] = useState<IFlight | null>(null);
    const flightId = parseFloat(id as string)

    useEffect(() => {
        if (!flight) {
            flightsApiService.getById(flightId).then((flight) => {
                setFlight(flight);
            });
        }
    })

    if (!flight) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Flight ID: {flight.id}</h1>
            <FlightDemonstrationsTableContainer
                flight={flight}
            />
        </div>
    )
}