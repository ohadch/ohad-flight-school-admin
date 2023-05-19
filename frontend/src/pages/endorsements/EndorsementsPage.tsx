import React, { useEffect, useState } from "react";
import { IEndorsement } from "../../@types";
import { endorsementApiService } from "../../services/api/endorsementsApi.service.ts";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateEndorsementDialog from "../../components/endorsements/CreateEndorsementDialog.tsx";

export default function EndorsementsPage() {
    const [endorsements, setEndorsements] = useState<IEndorsement[]>([]);
    const [createEndorsementDialogOpen, setCreateEndorsementDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        endorsementApiService.get().then((endorsements) => {
            setEndorsements(endorsements);
        });
    }, [])

    const addEndorsement = (name: string) => {
        endorsementApiService
            .create({
                name,
            })
            .then((endorsement) => {
                setEndorsements([...endorsements, endorsement]);
            })
            .catch((err) => {
                alert(err);
            })
    }

    const deleteEndorsement = (endorsement: IEndorsement) => {
        if (!window.confirm(`Are you sure you want to delete ${endorsement.name}?`)) {
            return;
        }

        endorsementApiService
            .delete(endorsement.id)
            .then(() => {
                setEndorsements(endorsements.filter((e) => e.id !== endorsement.id));
            })
            .catch((err) => {
                alert(err);
            })
    }


    return (
        <>
            <CreateEndorsementDialog
                open={createEndorsementDialogOpen}
                onClose={() => setCreateEndorsementDialogOpen(false)}
                onEndorsementCreate={addEndorsement}
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setCreateEndorsementDialogOpen(true)}
                            >
                                Create Endorsement
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {endorsements.map((endorsement) => (
                                    <TableRow key={endorsement.id}>
                                        <TableCell>{endorsement.id}</TableCell>
                                        <TableCell>{endorsement.name}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => deleteEndorsement(endorsement)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
}