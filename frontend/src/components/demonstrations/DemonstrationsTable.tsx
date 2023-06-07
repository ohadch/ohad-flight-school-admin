import {ICourse, IDemonstration, IEnrollment, IMember, ISyllabusItem} from "../../@types";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export interface DemonstrationsTableProps {
    demonstrations: IDemonstration[];
    syllabusItems: ISyllabusItem[];
    enrollments: IEnrollment[];
    students: IMember[];
    courses: ICourse[];
    onDemonstrationCreate: () => void;
    onDemonstrationEdit: (demonstration: IDemonstration) => void;
    onDemonstrationDelete: (demonstration: IDemonstration) => void;
}

export default function DemonstrationsTable(props : DemonstrationsTableProps) {
    const {
        enrollments,
        demonstrations,
        syllabusItems,
        students,
        courses,
        onDemonstrationCreate,
        onDemonstrationEdit,
        onDemonstrationDelete,
    } = props;

    const getEnrollmentById = (id: number) => enrollments.find(enrollment => enrollment.id === id);
    const getSyllabusItemById = (id: number) => syllabusItems.find(syllabusItem => syllabusItem.id === id);
    const getStudentById = (id: number) => students.find(member => member.id === id);
    const getCourseById = (id: number) => courses.find(course => course.id === id);

    function renderEnrollment(enrollmentId: number) {
        const enrollment = getEnrollmentById(enrollmentId);
        if (!enrollment) {
            return <span>Enrollment not found</span>
        }

        const student = getStudentById(enrollment.member_id);
        const course = getCourseById(enrollment.course_id);

        return (
            <p>
                <strong>{student?.name}</strong> in <strong>{course?.name}</strong>
            </p>
        )
    }

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
                        onClick={() => onDemonstrationCreate()}
                    >
                        New Demonstration
                    </Button>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="demonstrations table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Enrollment</TableCell>
                                <TableCell>Syllabus Item</TableCell>
                                <TableCell>Sufficient</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {demonstrations.map((demonstration) => (
                                <TableRow key={demonstration.id}>
                                    <TableCell component="th" scope="row">
                                        {demonstration.id}
                                    </TableCell>
                                    <TableCell>{
                                        renderEnrollment(demonstration.enrollment_id)
                                    }</TableCell>
                                    <TableCell>{
                                        getSyllabusItemById(demonstration.syllabus_item_id)?.name
                                    }</TableCell>
                                    <TableCell>{
                                        demonstration.sufficient ? "Yes" : "No"
                                    }</TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            onClick={() => onDemonstrationEdit(demonstration)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="warning"
                                            onClick={() => onDemonstrationDelete(demonstration)}
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