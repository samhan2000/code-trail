"use client"
import { notFound, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil } from "lucide-react"
import { CodeBlock } from "@/components/ui/code-block"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LessonForm, type LessonFormValues } from "@/components/lesson/lesson-form"
import Link from "next/link"
import { CodeView } from "@/components/ui/code-view"

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
    const moduleData = lessonsByModule[params.moduleId]
    if (!moduleData) return notFound()

    const router = useRouter()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{moduleData.name} Lessons</h1>
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
                    <Link href={`/lessons/create/${params.moduleId}`}><Plus className="mr-2 h-4 w-4" /> New Lesson</Link>
                </Button>
            </div>

            <div className="space-y-4">
                {moduleData.lessons.map((lesson) => (
                    <Card key={lesson.id} onClick={() => router.push(`/lessons/${lesson.id}`)} className="group transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base">{lesson.title}</CardTitle>
                                {lesson.notes && (
                                    <CardDescription className="mt-1 whitespace-pre-wrap">{lesson.notes}</CardDescription>
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
            </div>
        </div>
    )
}


