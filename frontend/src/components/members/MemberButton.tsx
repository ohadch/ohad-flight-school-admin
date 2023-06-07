import {Button, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import {IMember} from "../../@types";

export interface MemberButtonProps {
    member: IMember
}

export default function MemberButton(props: MemberButtonProps) {
    const {member} = props;

    return (
        <Tooltip
            title={"View member"}
            placement="top"
        >
            <Button
                component={Link}
                to={`/members/${member.id}`}
                variant="text"
            >
                <PersonIcon/>
                {member.name}
            </Button>
        </Tooltip>
    )
}