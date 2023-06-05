import {Link, useParams} from "react-router-dom";
import {ICourse, IEnrollment, IMember} from "../../@types";
import {useEffect, useState} from "react";
import {enrollmentsApiService, coursesApiService, membersApiService} from "../../services/api";
import {Grid, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import EnrollmentSyllabusContainer from "./EnrollmentSyllabusContainer.tsx";

export default function EnrollmentPage() {
    const {id} = useParams();
    const [enrollment, setEnrollment] = useState<IEnrollment | null>(null);
    const enrollmentId = parseFloat(id as string)
    const [member, setMember] = useState<IMember | null>(null);
    const [course, setCourse] = useState<ICourse | null>(null);
    const [syllabuses, setSyllabuses] = useState<any[] | null>(null); // TODO: replace any with ISyllabus

    useEffect( () => {
        (async () => {
            if (!enrollment) {
                const enrollment = await enrollmentsApiService.getById(enrollmentId)
                setEnrollment(enrollment);

                if (!member) {
                    const member = await membersApiService.getById(enrollment.member_id)
                    setMember(member);
                }

                if (!course) {
                    const course = await coursesApiService.getById(enrollment.course_id)
                    setCourse(course);

                    const syllabuses = await coursesApiService.getSyllabusesByCourseId(
                        course.id
                    )
                    setSyllabuses(syllabuses);
                }
            }
        })()
    })

    if (!enrollment || !member || !course) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h1
                >
                    <Tooltip
                        title={"View " + member.name + "'s profile"}
                    >
                        <Typography variant={"h4"} component={"span"} color={"primary"}>
                            <Link
                                to={`/members/${member.id}`}
                                style={{textDecoration: 'none', color: 'inherit'}}
                            >
                                {member.name + "'s "}
                            </Link>
                        </Typography>
                    </Tooltip>
                    <Typography variant={"h4"} component={"span"}>
                        Progress in
                    </Typography>
                    <Tooltip
                        title={"View " + course.name + "'s details"}
                    >
                        <Typography variant={"h4"} component={"span"} color={"primary"}>
                            <Link
                                to={`/courses/${course.id}`}
                                style={{textDecoration: 'none', color: 'inherit'}}
                            >
                                {' ' + course.name}
                            </Link>
                        </Typography>
                    </Tooltip>
                </h1>
            </Grid>
            {syllabuses && syllabuses.map((syllabus) => (
                <Grid item xs={12} key={syllabus.id}>
                    <h2>{syllabus.name}</h2>
                    <EnrollmentSyllabusContainer
                        syllabus={syllabus}
                        enrollment={enrollment}
                    />
                </Grid>
            ))}
        </Grid>
    )
}