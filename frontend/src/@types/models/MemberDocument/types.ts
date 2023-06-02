import {MemberDocumentStatus, MemberDocumentType} from "./enums.ts";

export interface IMemberDocument {
    id: number;
    member_id: number;
    type: MemberDocumentType;
    status: MemberDocumentStatus;
    expiration_at: string | null;
}

export interface IMemberDocumentCreate {
    type: MemberDocumentType;
    status: MemberDocumentStatus;
    expiration_at: string | null;
}

export interface IMemberDocumentUpdate {
    type: MemberDocumentType;
    status: MemberDocumentStatus;
    expiration_at: string | null;
}