import {IDemonstration, IFlight, ISyllabusItem} from "../../@types";
import DemonstrationsTable from "../demonstrations/DemonstrationsTable.tsx";
import {useEffect, useState} from "react";
import {demonstrationsApiService} from "../../services/api";

export interface FlightDemonstrationsTableContainerProps{
    flight: IFlight;
}

export default function FlightDemonstrationsTableContainer(props: FlightDemonstrationsTableContainerProps) {
    const {flight} = props;
    const [demonstrations, setDemonstrations] = useState<IDemonstration[] | null>(null);
    const [syllabusItems, setSyllabusItems] = useState<ISyllabusItem[] | null>(null);
    const [enrollments, setEnrollments] = useState<IEnrollment[] | null>(null);
    const [students, setStudents] = useState<IStudent[] | null>(null);
    const [courses, setCourses] = useState<ICourse[] | null>(null);


    useEffect(() => {
        (async () => {
            if (!demonstrations) {
                const demonstrations = await demonstrationsApiService.getDemonstrationsByFlightId(
                    flight.id
                );

                setDemonstrations(demonstrations);
            }

            if (!syllabusItems) {
                const syllabusItems = await syllabusItemsApiService.getSyllabusItemsByFlightId(
                    flight.id
                );

                setSyllabusItems(syllabusItems);
            }
        })();
    })

    return (
        <div>
            <h1>Flight ID: {flight.id}</h1>
            <DemonstrationsTable
                demonstrations={demonstrations || []}
                syllabusItems={}
                enrollments={}
                students={}
                courses={}
                onDemonstrationCreate={}
                onDemonstrationEdit={}
                onDemonstrationDelete={}
            />
        </div>
    )
}