import {IMemberDocument} from "../../@types/models/MemberDocument";
import {Button, Card, CardActions, CardHeader} from "@mui/material";

export interface MemberDocumentCardProps {
    document: IMemberDocument;
    onMemberDocumentDelete: (document: IMemberDocument) => void;
}

export default function MemberDocumentCard({ document, onMemberDocumentDelete }: MemberDocumentCardProps) {
    return (
        <Card>
            <CardHeader title={document.type} />
            <CardActions>
                <Button size="small" color="error" onClick={() => onMemberDocumentDelete(document)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}