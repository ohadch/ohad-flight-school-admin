import { IMember } from '../../../@types';
import { Card, Chip } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


export interface MemberCardProps {
    member: IMember
    onMemberDelete: (member: IMember) => void
}

export default function MemberCard({ member, onMemberDelete }: MemberCardProps) {
    const qualifications = {
        "Before Solo Student": member.is_before_solo_student,
        "Solo Student": member.is_solo_student,
        "Private Pilot": member.is_private_pilot,
        "CFI": member.is_cfi,
    }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {member.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Object.entries(qualifications).map(([name, value]) => {
                if (value) {
                    return <Chip label={name} />
                }
            })}
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