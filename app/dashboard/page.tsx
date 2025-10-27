"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NewStackForm, StackFormValues } from "@/components/stack/new-stack-form"
import { useState } from "react"
import { useGlobalState } from "../context/GlobalState"
import { useToast } from "@/components/ui/useToast"
import { useRouter } from "next/navigation"

type Stack = {
  id: string
  name: string
  description: string
  totalModules: number
  totalLessons: number
}

type Lesson = {
  id: string
  title: string
  stack: string
  module: string
  progress: number
  lastVisited: string
}

const stacks: Stack[] = [
  { id: "frontend", name: "Frontend", description: "UI frameworks, CSS, JS tooling", totalModules: 12, totalLessons: 24 },
  { id: "backend", name: "Backend", description: "APIs, databases, services", totalModules: 7, totalLessons: 18 },
  { id: "cloud", name: "Cloud", description: "AWS, CI/CD, infra", totalModules: 3, totalLessons: 12 },
]

// Mock lessons (replace with API/fetch later)
const recentLessons: Lesson[] = [
  { id: "react-hooks", title: "Mastering React Hooks", stack: "Frontend", module: "React Basics", progress: 40, lastVisited: "2 days ago" },
  { id: "nestjs-auth", title: "Authentication in NestJS", stack: "Backend", module: "APIs", progress: 70, lastVisited: "5 days ago" },
  { id: "aws-s3", title: "Working with AWS S3", stack: "Cloud", module: "Storage", progress: 20, lastVisited: "1 week ago" },
]

export default function DashboardPage() {

  const [openNewStack, setOpenNewStack] = useState(false)

  const router = useRouter()

  const { toast } = useToast()

  const saveNewStack = async (formValues: { name: string, description: string }) => {
    try {
      // await fetch("/api/stack/create", {
      //   method: "POST",
      //   body: JSON.stringify({ ...formValues, userId: state.userId })
      // })

      toast({
        title: "Success!",
        description: "Stack added successfully"
      })
    } catch (err) {
      toast({
        title: "Error!",
        description: "Stack could not be added, Please try again later"
      })
    }
  }

  return (
    <div className="space-y-10">
      {/* Top Section */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your learning stacks at a glance</p>
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
                console.log("submit lesson", values)
                setOpenNewStack(false)
                saveNewStack(values)

              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stacks Section */}
      {stacks.length > 0 && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stacks.map((stack) => {
              const progress = Math.round((stack.totalModules / Math.max(1, stack.totalLessons)) * 100)
              return (
                <Card
                  key={stack.id}
                  className="group transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  onClick={() => router.push(`/stacks/${stack.id}`)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <Link href={`/stacks/${stack.id}`} className="hover:underline">{stack.name}</Link>
                    </CardTitle>
                    <CardDescription>{stack.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>{stack.totalModules} Modules</span>
                      <span>{stack.totalLessons} Lessons</span>
                    </div>
                    <Progress value={progress} />
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="flex justify-end">
            <Link href="/stacks" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              View all Stacks <span aria-hidden>→</span>
            </Link>
          </div>
        </>

      )}


      {/* Recently Visited Lessons Section */}
      {recentLessons.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" /> Recently Visited Lessons
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentLessons.map((lesson) => (
              <Card key={lesson.id} className="group transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                onClick={() => router.push(`/lessons/${lesson.id}`)}>
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    <Link href={`/lessons/${lesson.id}`} className="hover:underline">
                      {lesson.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {lesson.stack} / {lesson.module}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={lesson.progress} className="mb-2" />
                  <p className="text-xs text-muted-foreground">Last visited {lesson.lastVisited}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
