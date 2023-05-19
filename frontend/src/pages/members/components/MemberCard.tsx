import { IMember } from '../../../@types';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


export interface MemberCardProps {
    member: IMember
    onMemberDelete: (member: IMember) => void
}

export default function MemberCard({ member, onMemberDelete }: MemberCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {member.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Some quick example text to build on the card title and make up the bulk of
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="error" onClick={() => onMemberDelete(member)}>
            Delete
        </Button>
      </CardActions>
    </Card>
  );
}