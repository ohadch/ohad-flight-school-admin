import {useParams} from "react-router-dom";
import {IMember} from "../../@types";
import {useEffect, useState} from "react";
import {memberApiService} from "../../services/api";

export default function MemberPage() {
    const {id} = useParams();
    const [member, setMember] = useState<IMember | null>(null);

    useEffect(() => {
        if (member) {
            return;
        }

        if (!id) {
            return;
        }

        memberApiService.getById(parseFloat(id)).then((member) => {
            setMember(member);
        });
    })

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{member.name}</h1>
        </div>
    )
}