import FlightsTable from "../../components/flights/FlightsTable.tsx";
import {useEffect, useState} from "react";
import {flightsApiService, membersApiService} from "../../services/api";
import CreateFlightDialog from "../../components/flights/CreateFlightDialog.tsx";
import EditFlightDialog from "../../components/flights/EditFlightDialog.tsx";
import {IFlight, IFlightCreate, IFlightUpdate, IMember, MemberStatus} from "../../@types";

export default function FlightsPage() {
    const [flights, setFlights] = useState<IFlight[] | null>(null);
    const [createFlightDialogOpen, setCreateFlightDialogOpen] = useState<boolean>(false);
    const [currentlyEditedFlight, setCurrentlyEditedFlight] = useState<IFlight | null>(null);
    const [members, setMembers] = useState<IMember[] | null>(null); // [TODO
    const [students, setStudents] = useState<IMember[] | null>(null);
    const [instructors, setInstructors] = useState<IMember[] | null>(null);

    useEffect(() => {
        if (!flights) {
            flightsApiService.get().then((flights) => {
                setFlights(flights);
            })
        }

        if (!members) {
            membersApiService.get().then((members) => {
                setMembers(members);
                setStudents(members.filter((member) => [
                    MemberStatus.BEFORE_SOLO_STUDENT,
                    MemberStatus.SOLO_STUDENT,
                ].includes(member.status)));
                setInstructors(members.filter((member) => [
                    MemberStatus.CFI,
                ].includes(member.status)));
            })
        }
    })

    const createFlight = (data: IFlightCreate) => {
        flightsApiService.create(data).then((flight) => {
            setFlights([...(flights || []), flight]);
        })
    }

    const updateFlight = (flightId: number, data: IFlightUpdate) => {
        flightsApiService.update(flightId, data).then((flight) => {
            setFlights((flights || []).map((d) => {
                if (d.id === flight.id) {
                    return flight;
                }

                return d;
            }));
        })
    }

    const deleteFlight = (data: IFlight) => {
        if (!confirm(`Are you sure you want to delete the flight?`)) {
            return;
        }

        flightsApiService.delete(data.id).then(() => {
            setFlights((flights || []).filter((d) => {
                return d.id !== data.id;
            }));
        })
    }

    return (
        <>
            <CreateFlightDialog
                open={createFlightDialogOpen}
                onClose={() => setCreateFlightDialogOpen(false)}
                onFlightCreate={createFlight}
                students={students || []}
                instructors={instructors || []}
            />
            {currentlyEditedFlight && (
                <EditFlightDialog
                    open={!!currentlyEditedFlight}
                    onClose={() => setCurrentlyEditedFlight(null)}
                    flight={currentlyEditedFlight}
                    students={students || []}
                    instructors={instructors || []}
                    onFlightUpdate={(update) => updateFlight(currentlyEditedFlight.id, update)}
                />
            )}
            <FlightsTable
                flights={flights || []}
                students={students || []}
                instructors={instructors || []}
                onFlightCreate={() => setCreateFlightDialogOpen(true)}
                onFlightEdit={(flight) => setCurrentlyEditedFlight(flight)}
                onFlightDelete={deleteFlight}
            />
        </>
    )
}