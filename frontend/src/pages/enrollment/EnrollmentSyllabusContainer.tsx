import {IDemonstration, IEnrollment, ISyllabus, ISyllabusItem} from "../../@types";
import {useEffect, useState} from "react";
import {SyllabusItemsApiService} from "../../services/api/syllabusItemsApi.service.ts";
import EnrollmentSyllabusTable from "./EnrollmentSyllabusTable.tsx";

export interface EnrollmentSyllabusProgressProps {
    enrollment: IEnrollment;
    syllabus: ISyllabus;
    demonstrations: IDemonstration[];
}

export default function EnrollmentSyllabusContainer(props: EnrollmentSyllabusProgressProps) {
    const {syllabus, demonstrations} = props;

    const [items, setItems] = useState<ISyllabusItem[] | null>(null);
    const syllabusItemsApiService = new SyllabusItemsApiService(syllabus.id);

    useEffect(() => {
        if (!items) {
            syllabusItemsApiService.get().then((items) => {
                setItems(items);
            });
        }
    })

    if (!items) {
        return <div>"Loading...";</div>
    }

    return (
        <EnrollmentSyllabusTable
            items={items}
            demonstrations={demonstrations}
        />
    )
}