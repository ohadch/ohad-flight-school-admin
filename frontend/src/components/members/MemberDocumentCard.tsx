import {IMemberDocument} from "../../@types/models/MemberDocument";
import {Button, Card, CardActions, CardHeader} from "@mui/material";
import CardContent from "@mui/material/CardContent";

export interface MemberDocumentCardProps {
    document: IMemberDocument;
    onMemberDocumentDelete: (document: IMemberDocument) => void;
}

export default function MemberDocumentCard({ document, onMemberDocumentDelete }: MemberDocumentCardProps) {
    const expirationAtString = document.expiration_at
        ? new Date(document.expiration_at).toLocaleDateString([
            'he-IL',
        ])
        : 'N/A';

    /**
     * Render the expiration date of the document
     * If the document has an expiration date, render it
     * If the expiration date is null, render N/A
     * If the expiration date passed, render Expired and highlight it
     */
    function renderExpirationDate() {
        if (document.expiration_at) {
            return (
                <p>
                    Expiration Date:
                    {new Date(document.expiration_at) < new Date() ? (
                        <strong style={{ color: 'red' }}>
                            Expired
                        </strong>
                    ) : (
                        <strong>{expirationAtString}</strong>
                    )}
                </p>
            )
        }

        return (
            <p>
                <label>Expiration Date:</label>
                <strong>N/A</strong>
            </p>
        )
    }

    return (
        <Card>
            <CardHeader title={document.type} />
            <CardContent>
                {renderExpirationDate()}
            </CardContent>
            <CardActions>
                <Button size="small" color="error" onClick={() => onMemberDocumentDelete(document)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}