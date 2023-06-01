import {useParams} from "react-router-dom";
import {IMember} from "../../@types";
import {useEffect, useState} from "react";
import {memberApiService} from "../../services/api";
import MemberDocuments from "./MemberDocuments.tsx";

export default function MemberPage() {
    const {id} = useParams();
    const [member, setMember] = useState<IMember | null>(null);
    const memberId = parseFloat(id as string)

    useEffect(() => {
        if (!member) {
            memberApiService.getById(memberId).then((member) => {
                setMember(member);
            });
        }
    })

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{member.name}</h1>
            <MemberDocuments member={member} />
        </div>
    )
}