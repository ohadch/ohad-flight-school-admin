export interface IDemonstration {
    id: number;
    enrollment_id: number;
    syllabus_item_id: number;
    flight_id: number | null;
    sufficient: boolean;
}

export interface IDemonstrationCreate {
    enrollment_id: number;
    syllabus_item_id: number;
    flight_id: number | null;
    sufficient: boolean;
}

export interface IDemonstrationUpdate {
    sufficient: boolean;
}