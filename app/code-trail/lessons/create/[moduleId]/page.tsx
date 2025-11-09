"use client"

import { useGlobalState } from '@/app/context/GlobalState'
import { LessonForm, LessonFormValues } from '@/components/lesson/lesson-form'
import { useToast } from '@/components/ui/useToast'
import api from '@/lib/axios-client'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = ({ params }: { params: { moduleId: string } }) => {

    const { state } = useGlobalState()
    const { toast } = useToast()
    const router = useRouter()

    const handleSubmit = async (value: any) => {
        try {
            // API Call
            const payload = {
                ...value,
                userId: state.userId,
                moduleSlug: params.moduleId
            }

            await api.post('/lessons/create', payload)
            toast({
                title: "Success",
                description: "Lesson added succesfully"
            })
            router.push(`/code-trail/modules/${params.moduleId}`)
        } catch (err) {

        }
    }

    return (
        <LessonForm onSubmit={handleSubmit} />
    )
}

export default page