import { useEffect, useState } from 'react'
import { IMember } from "../../@types";
import { memberApiService } from "../../services/api";
import { Button, Grid } from '@mui/material';
import MemberCard from './components/MemberCard';
import CreateMemberDialog from '../../components/members/CreateMemberDialog';

export default function MembersPage() {
    const [members, setMembers] = useState<IMember[]>([]);
    const [createMemberDialogOpen, setCreateMemberDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        memberApiService.get().then((members) => {
            setMembers(members);
        });
    }, []);

    const addMember = (name: string) => {
        memberApiService
            .create({
                name,
            })
            .then((member) => {
                setMembers([...members, member]);
            })
            .catch((err) => {
                alert(err);
            })
    }

    const deleteMember = (member: IMember) => {
        if (!window.confirm(`Are you sure you want to delete ${member.name}?`)) {
            return;
        }

        memberApiService
            .delete(member.id)
            .then(() => {
                setMembers(members.filter((m) => m.id !== member.id));
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <>
            <CreateMemberDialog
                open={createMemberDialogOpen}
                onClose={() => setCreateMemberDialogOpen(false)}
                onMemberCreate={addMember}
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setCreateMemberDialogOpen(true)}
                            >
                                Add Member
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {members.map((member) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
                        <MemberCard
                            member={member}
                            onMemberDelete={deleteMember}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}