"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NewStackForm, StackFormValues } from "@/components/stack/new-stack-form"
import { useGlobalState } from "@/app/context/GlobalState"
import { useToast } from "@/components/ui/useToast"
import api from "@/lib/axios-client"

// const stacks = [
//     { id: "frontend", name: "Frontend", description: "UI frameworks, CSS, JS tooling" },
//     { id: "backend", name: "Backend", description: "APIs, databases, services" },
//     { id: "cloud", name: "Cloud", description: "AWS, CI/CD, infra" },
// ]

export default function StacksPage() {

    const [openNewStack, setOpenNewStack] = useState(false)
    const [stacks, setStacks] = useState<any>([])

    const { toast } = useToast()

    const { state, loaderStack } = useGlobalState()

    useEffect(() => {
        fetchAllStacks()
    }, [])

    const fetchAllStacks = async () => {
        const res = await api.post('/stacks/getAllStacks', { userId: state.userId }).then(d => d.data)
        setStacks(res)
    }

    const saveNewStack = async (formValues: { name: string, description: string }) => {
        try {

            loaderStack(true)
            await api.post("/stacks/create", { ...formValues, userId: state.userId })
            loaderStack(false)
            fetchAllStacks()
            toast({
                title: "Success!",
                description: "Stack added successfully"
            })
        } catch (err) {
            loaderStack(false)
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
                    <h1 className="text-2xl font-bold tracking-tight">Stacks</h1>
                    <p className="text-sm text-muted-foreground">All your learning stacks</p>
                </div>
                <Dialog open={openNewStack} onOpenChange={setOpenNewStack}>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer" onClick={() => setOpenNewStack(true)}><Plus className="mr-2 h-4 w-4" /> New Stack</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Stack</DialogTitle>
                        </DialogHeader>
                        <NewStackForm
                            onSubmit={(values: StackFormValues) => {
                                setOpenNewStack(false)
                                saveNewStack(values)

                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stacks.map((stack: any) => (
                    <Card key={stack.id}>
                        <CardHeader>
                            <CardTitle>
                                <Link href={`/code-trail/stacks/${stack.slug}`} className="hover:underline">{stack.name}</Link>
                            </CardTitle>
                            <CardDescription>{stack.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/code-trail/stacks/${stack.slug}`} className="text-sm text-primary hover:underline">View modules →</Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}


