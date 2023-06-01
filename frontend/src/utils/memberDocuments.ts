import {MemberDocumentType} from "../@types/models/MemberDocument";

export const getDisplayNameByMemberDocumentType = (type: MemberDocumentType) => {
    switch (type) {
        case MemberDocumentType.MEDICAL:
            return "Medical";
        case MemberDocumentType.MEMBERSHIP_AGREEMENT:
            return "Membership Agreement";
        case MemberDocumentType.STUDENT_LICENSE:
            return "Student License";
    }
}