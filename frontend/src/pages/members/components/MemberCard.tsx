import { IMember } from '../../../@types';
import { Card, Chip } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {getDisplayNameByMemberStatus} from "../../../utils/members.ts";


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
            <Chip label={getDisplayNameByMemberStatus(member.status)} />
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