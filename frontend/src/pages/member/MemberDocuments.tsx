import {IMemberDocument, IMemberDocumentCreate} from "../../@types/models/MemberDocument";
import {Button, Grid} from "@mui/material";
import MemberDocumentCard from "../../components/members/MemberDocumentCard.tsx";
import CreateMemberDocumentDialog from "../../components/members/CreateMemberDocumentDialog.tsx";
import {useEffect, useState} from "react";
import {IMember} from "../../@types";
import {MemberDocumentsApiService} from "../../services/api/memberDocumentsApi.service.ts";
import {getDisplayNameByMemberDocumentType} from "../../utils/memberDocuments.ts";

export interface MemberDocumentsProps {
    member: IMember;
}

export default function MemberDocuments({member}: MemberDocumentsProps) {
    const [documents, setDocuments] = useState<IMemberDocument[] | null>(null);
    const [createMemberDocumentDialogOpen, setCreateMemberDocumentDialogOpen] = useState<boolean>(false);
    const memberDocumentsApiService = new MemberDocumentsApiService(member.id);

    useEffect(() => {
        if (!documents) {
            memberDocumentsApiService.get().then((documents) => {
                setDocuments(documents);
            });
        }
    })

    const createMemberDocument = (data: IMemberDocumentCreate) => {
        memberDocumentsApiService
            .create(data)
            .then((document) => {
                setDocuments([...(documents || []), document]);
            })
            .catch((err) => {
                alert(err);
            })
    }

    const deleteMemberDocument = (document: IMemberDocument) => {
        const documentDisplayName = getDisplayNameByMemberDocumentType(document.type);

        if (!window.confirm(`Are you sure you want to delete ${member.name}'s ${documentDisplayName} document?`)) {
            return;
        }

        memberDocumentsApiService
            .delete(document.id)
            .then(() => {
                setDocuments((documents || []).filter((d) => d.id !== document.id));
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <>
            <CreateMemberDocumentDialog
                open={createMemberDocumentDialogOpen}
                onClose={() => setCreateMemberDocumentDialogOpen(false)}
                onMemberDocumentCreate={createMemberDocument}
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setCreateMemberDocumentDialogOpen(true)}
                            >
                                Add Document
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {documents && documents.map((document) => (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <MemberDocumentCard
                            document={document}
                            onMemberDocumentDelete={() => deleteMemberDocument(document)}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}