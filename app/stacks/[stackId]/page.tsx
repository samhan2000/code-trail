"use client"

import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NewStackForm, StackFormValues } from "@/components/stack/new-stack-form"
import { useState } from "react"
import { useToast } from "@/components/ui/useToast"
import { useGlobalState } from "@/app/context/GlobalState"

const data = {
    frontend: {
        name: "Frontend",
        modules: [
            { id: "nextjs", name: "Next.js", description: "App Router, data fetching", completed: 4, total: 10 },
            { id: "react", name: "React", description: "Hooks, Suspense, patterns", completed: 6, total: 12 },
        ],
    },
    backend: {
        name: "Backend",
        modules: [
            { id: "nestjs", name: "NestJS", description: "Controllers, providers, testing", completed: 2, total: 9 },
            { id: "prisma", name: "Prisma", description: "ORM basics, relations", completed: 1, total: 6 },
        ],
    },
    cloud: {
        name: "Cloud",
        modules: [
            { id: "aws", name: "AWS", description: "EC2, S3, IAM", completed: 1, total: 8 },
        ],
    },
} as const

export default function StackDetailPage({ params }: { params: { stackId: string } }) {
    const stack: any = (data as any)[params.stackId]
    if (!stack) return notFound()

    const [openNewModule, setOpenNewModule] = useState(false)

    const router = useRouter()
    const { toast } = useToast()
    const { state } = useGlobalState()

    const saveNewModule = async (formValues: { name: string, description: string }) => {
        try {
            const payload = {
                ...formValues,
                userId: state.userId,
                stackId: stack
            }
            // await fetch("/api/stack/create", {
            //   method: "POST",
            //   body: JSON.stringify({ ...formValues, userId: state.userId })
            // })

            toast({
                title: "Success!",
                description: "Module added successfully"
            })
        } catch (err) {
            toast({
                title: "Error!",
                description: "Stack could not be added, Please try again later"
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{stack.name} Modules</h1>
                    <p className="text-sm text-muted-foreground">Choose a module to view lessons</p>
                </div>

                <Dialog open={openNewModule} onOpenChange={setOpenNewModule}>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer" onClick={() => setOpenNewModule(true)}><Plus className="mr-2 h-4 w-4" /> New Module</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Module</DialogTitle>
                        </DialogHeader>
                        <NewStackForm
                            onSubmit={(values: StackFormValues) => {
                                console.log("submit lesson", values)
                                setOpenNewModule(false)
                                saveNewModule(values)
                            }}
                        />
                    </DialogContent>
                </Dialog>
                {/* <Button asChild>
                    <Link href={`/stacks/${params.stackId}/modules/new`}><Plus className="mr-2 h-4 w-4" /> New Module</Link>
                </Button> */}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stack.modules.map((m: any) => {
                    const progress = Math.round((m.completed / Math.max(1, m.total)) * 100)
                    return (
                        <Card key={m.id} className="group transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer" onClick={() => router.push(`/modules/${m.id}`)}>
                            <CardHeader>
                                <CardTitle>
                                    <Link href={`/modules/${m.id}`} className="hover:underline">{m.name}</Link>
                                </CardTitle>
                                <CardDescription>{m.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>{m.completed} / {m.total} lessons</span>
                                    <span className="text-muted-foreground">{progress}%</span>
                                </div>
                                <Progress value={progress} />
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}


