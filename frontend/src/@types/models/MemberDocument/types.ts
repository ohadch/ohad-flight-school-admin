import {MemberDocumentType} from "./enums.ts";

export interface IMemberDocument {
    id: number;
    member_id: number;
    type: MemberDocumentType;
    expiration_at: Date | null;
}

export interface IMemberDocumentCreate {
    type: MemberDocumentType;
    expiration_at: Date | null;
}

export interface IMemberDocumentUpdate {
    type: MemberDocumentType;
    expiration_at: Date | null;
}