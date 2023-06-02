import { useEffect, useState } from 'react'
import { IMember, IMemberCreate } from "../../@types";
import { memberApiService } from "../../services/api";
import { Button, Grid } from '@mui/material';
import CreateMemberDialog from '../../components/members/CreateMemberDialog';
import MembersTable from "../../components/members/MembersTable.tsx";

export default function MembersPage() {
    const [members, setMembers] = useState<IMember[]>([]);
    const [createMemberDialogOpen, setCreateMemberDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        memberApiService.get().then((members) => {
            setMembers(members);
        });
    }, []);

    const addMember = (data: IMemberCreate) => {
        memberApiService
            .create(data)
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
                <Grid item xs={12}>
                    <MembersTable members={members} onDeleteMember={deleteMember} />
                </Grid>
            </Grid>
        </>
    )
}