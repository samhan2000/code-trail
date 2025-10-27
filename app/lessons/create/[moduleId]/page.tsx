"use client"

import { LessonForm, LessonFormValues } from '@/components/lesson/lesson-form'
import React from 'react'

const page = () => {

    const handleSubmit = (value: any) => {
        console.log(value, "value")
    }

    return (
        <LessonForm onSubmit={handleSubmit} />
    )
}

export default page