import {IInstructionPlan} from "../../@types/models/InstructionPlan";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Link} from "react-router-dom";

export interface InstructionPlansTableProps {
    instructionPlans: IInstructionPlan[];
    onInstructionPlanCreate: () => void;
    onInstructionPlanEdit: (instructionPlan: IInstructionPlan) => void;
    onInstructionPlanDelete: (instructionPlan: IInstructionPlan) => void;
}

export default function InstructionPlansTable(props : InstructionPlansTableProps) {
    const {
        instructionPlans,
        onInstructionPlanCreate,
        onInstructionPlanEdit,
        onInstructionPlanDelete,
    } = props;

    return (
        <Box>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                }}
            >
                <Toolbar>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onInstructionPlanCreate()}
                    >
                        New Instruction Plan
                    </Button>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="instruction plans table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {instructionPlans.map((instructionPlan) => (
                                <TableRow key={instructionPlan.id}>
                                    <TableCell component="th" scope="row">
                                        {instructionPlan.id}
                                    </TableCell>
                                    <TableCell>{instructionPlan.name}</TableCell>
                                    <TableCell>
                                        <Button component={Link} to={`/instruction-plans/${instructionPlan.id}`}>
                                            View
                                        </Button>
                                        <Button
                                            color="primary"
                                            onClick={() => onInstructionPlanEdit(instructionPlan)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="warning"
                                            onClick={() => onInstructionPlanDelete(instructionPlan)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}