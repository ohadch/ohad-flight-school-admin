import {useEffect, useState} from 'react'
import {IMember, IMemberCreate} from "../../@types";
import {memberApiService} from "../../services/api";
import { Grid } from '@mui/material';
import MemberCard from './components/MemberCard';

export default function MembersPage() {
    const [members, setMembers] = useState<IMember[]>([]);
    const [newMemberName, setNewMemberName] = useState<string>("");

    useEffect(() => {
        memberApiService.get().then((members) => {
            setMembers(members);
        });
    }, []);

    const addMember = () => {
        const newMember: IMemberCreate = {
            name: newMemberName,
        };
        memberApiService
            .create(newMember)
            .then((member) => {
                setMembers([...members, member]);
                setNewMemberName("");
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                />
                <button onClick={addMember}>Add Member</button>
            </Grid>
            {members.map((member) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
                    <MemberCard
                        member={member}
                    />
                </Grid>
            ))}
        </Grid>
    )
}