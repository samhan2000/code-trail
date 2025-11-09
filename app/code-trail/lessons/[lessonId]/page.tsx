"use client"

import { useGlobalState } from '@/app/context/GlobalState'
import { LessonForm, LessonFormValues } from '@/components/lesson/lesson-form'
import { useToast } from '@/components/ui/useToast'
import api from '@/lib/axios-client'
import { Ban, CheckCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const page = ({ params }: { params: { lessonId: string } }) => {

    const [lessonDetails, setLessonDetails] = useState<any>({})
    const [moduleId, setModuleId] = useState()
    const { state } = useGlobalState()
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        const fetchLessonDetails = async () => {
            const payload = {
                lessonSlug: params.lessonId,
                userId: state.userId
            }
            const lessonDetails = await api.post("/lessons/getLessonBySlug", payload).then(d => d.data)
            setModuleId(lessonDetails.moduleId)
            console.log(lessonDetails, "Lesson details")
            if (lessonDetails) {
                setLessonDetails(lessonDetails)
            }
        }

        fetchLessonDetails()
    }, [])

    const handleSubmit = async (value: any) => {
        const payload = {
            data: value,
            userId: state.userId,
            lessonId: lessonDetails.id
        }

        await api.post('/lessons/saveLesson', payload)
        toast({
            title: "Success",
            description: "Lesson saved succesfully"
        })
        router.push(`/code-trail/modules/${moduleId}`)
    }

    const handleStatusChange = async () => {
        const payload = {
            completed: !lessonDetails.completed,
            userId: state.userId,
            lessonId: lessonDetails.id
        }

        const res = await api.post('/lessons/markStatus', payload).then(d => d.data)
        console.log(res, "Response")
        setLessonDetails(res)
    }

    return (
        <>
            <LessonForm initialValues={lessonDetails} onSubmit={handleSubmit} />
            <button
                onClick={handleStatusChange}
                className={`rounded-md p-2 font-medium cursor-pointer transition-colors ${lessonDetails?.completed ? '!bg-red-600' : '!bg-green-600'}`}
            >
                {lessonDetails?.completed ? (<div className='flex justify-between'>
                    < Ban />
                    <div className='ml-2'>Mark lesson as incomplete</div>
                </div>) : (<div className='flex justify-between'>
                    < CheckCheck />
                    <div className='ml-2'>Mark as complete</div>
                </div>)}
            </button>
        </>
    )
}

export default page