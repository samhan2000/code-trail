"use client"
import { notFound, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Badge, Check } from "lucide-react"
import { CodeBlock } from "@/components/ui/code-block"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LessonForm, type LessonFormValues } from "@/components/lesson/lesson-form"
import Link from "next/link"
import { CodeView } from "@/components/ui/code-view"
import { useEffect, useState } from "react"
import { useGlobalState } from "@/app/context/GlobalState"
import api from "@/lib/axios-client"

type Lesson = {
    id: string
    title: string
    notes?: string
    code?: string
}

const lessonsByModule: Record<string, { name: string; lessons: Lesson[] }> = {
    nextjs: {
        name: "Next.js",
        lessons: [
            {
                id: "1",
                title: "App Router basics",
                notes: "Learned nested layouts and loading UI.",
                code: "export default function Page(){ return <div>Hello</div> }",
            },
            {
                id: "2",
                title: "Server Actions",
                notes: "Form actions with revalidation.",
            },
        ],
    },
    react: {
        name: "React",
        lessons: [
            { id: "1", title: "useEffect vs useMemo", notes: "Know the differences." },
        ],
    },
}

export default function ModulePage({ params }: { params: { moduleId: string } }) {
    // const moduleData = lessonsByModule[params.moduleId]
    // if (!moduleData) return notFound()

    const [lessons, setLessons] = useState([])
    const [moduleName, setModuleName] = useState()
    const [moduleId, setModuleId] = useState()

    const router = useRouter()
    const { state } = useGlobalState()

    useEffect(() => {
        fetchAllLessons()
    }, [])

    const fetchAllLessons = async () => {
        const payload = {
            moduleSlug: params.moduleId,
            userId: state.userId
        }

        const res = await api.post('/lessons/getAllLessonsForModule', payload).then(d => d.data)
        if (!res) return notFound()

        setLessons(res.allLessons)
        setModuleName(res.moduleName)
        setModuleId(res.moduleId)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{moduleName} Lessons</h1>
                    <p className="text-sm text-muted-foreground">Your timeline of notes and snippets</p>
                </div>
                {/* <Dialog>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> New Lesson</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Lesson</DialogTitle>
                        </DialogHeader>
                        <LessonForm
                            onSubmit={(values: LessonFormValues) => {
                                console.log("submit lesson", values)
                            }}
                        />
                    </DialogContent>
                </Dialog> */}
                <Button asChild>
                    <Link href={`/code-trail/lessons/create/${params.moduleId}`}><Plus className="mr-2 h-4 w-4" /> New Lesson</Link>
                </Button>
            </div>

            {lessons?.length > 0 ? (<div className="space-y-4">
                {lessons.map((lesson: any) => (
                    <Card
                        key={lesson.id}
                        onClick={() => router.push(`/code-trail/lessons/${lesson.slug}`)}
                        className="relative group transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                    >
                        {lesson?.completed && (
                            <div
                                className="absolute top-3 right-3 text-green-600 border-green-600/30 flex items-center gap-1"
                            >
                                <Check className="" />
                            </div>
                        )}

                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base">{lesson.title}</CardTitle>
                                {lesson.notes && (
                                    <CardDescription className="mt-1 whitespace-pre-wrap">
                                        {lesson.notes}
                                    </CardDescription>
                                )}
                            </div>
                        </CardHeader>

                        {lesson.code && (
                            <CardContent>
                                <CodeView code={lesson.code} />
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>) : (
                <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-muted rounded-lg">
                    <div className="bg-muted/40 p-3 rounded-full mb-4">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No lessons yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Start learning by creating your first lesson
                    </p>
                </div>
            )}
        </div>
    )
}


