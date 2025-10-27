"use client"

import { LessonForm, LessonFormValues } from '@/components/lesson/lesson-form'
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { lessonId: string } }) => {

    const [initialValues, setInitialValues] = useState({})
    console.log(params.lessonId, "Lesson Id")

    useEffect(() => {
        const fetchLessonDetails = async () => {
            // API call to fetch lesson data | Module data | Stack Data
            // Set value
        }
    }, [])

    const handleSubmit = (value: any) => {
        console.log(value, "value")
    }

    return (
        <LessonForm onSubmit={handleSubmit} />
    )
}

export default page