export interface IMember {
    id: number;
    name: string;
    is_before_solo_student: boolean;
    is_solo_student: boolean;
    is_private_pilot: boolean;
    is_cfi: boolean;
}

export interface IMemberCreate {
    name: string;
    is_before_solo_student: boolean;
    is_solo_student: boolean;
    is_private_pilot: boolean;
    is_cfi: boolean;
}

export interface IMemberUpdate {
    name: string;
    is_before_solo_student: boolean;
    is_solo_student: boolean;
    is_private_pilot: boolean;
    is_cfi: boolean;
}