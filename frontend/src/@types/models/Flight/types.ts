export interface IFlight {
    id: number;
    date: string;
    student_id: number;
    instructor_id: number;
    solo: boolean;
    duration_hours: number;
}

export interface IFlightCreate {
    date: string;
    student_id: number;
    instructor_id: number;
    solo: boolean;
    duration_hours: number;
}

export interface IFlightUpdate {
    date?: string;
    student_id?: number;
    instructor_id?: number;
    solo?: boolean;
    duration_hours?: number;
}