import {useParams} from "react-router-dom";
import {IFlight} from "../../@types";
import {useEffect, useState} from "react";
import FlightSyllabusesContainer
    from "../../components/flightSyllabuses/FlightSyllabusesContainer.tsx";
import {flightsApiService} from "../../services/api";
import DemonstrationsTable from "../../components/demonstrations/DemonstrationsTable.tsx";

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
            <DemonstrationsTable
                flight={flight}
            />
        </div>
    )
}