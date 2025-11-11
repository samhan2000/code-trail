"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NewStackForm, StackFormValues } from "@/components/stack/new-stack-form"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/useToast"
import { useRouter } from "next/navigation"
import api from "@/lib/axios-client"
import { useGlobalState } from "@/app/context/GlobalState"
import { StackSummary } from "@/app/types/AllInterfaces"

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

// const stacks: Stack[] = [
//   { id: "frontend", name: "Frontend", description: "UI frameworks, CSS, JS tooling", totalModules: 12, totalLessons: 24 },
//   { id: "backend", name: "Backend", description: "APIs, databases, services", totalModules: 7, totalLessons: 18 },
//   { id: "cloud", name: "Cloud", description: "AWS, CI/CD, infra", totalModules: 3, totalLessons: 12 },
// ]

// // Mock lessons (replace with API/fetch later)
// const recentLessons: Lesson[] = [
//   { id: "react-hooks", title: "Mastering React Hooks", stack: "Frontend", module: "React Basics", progress: 40, lastVisited: "2 days ago" },
//   { id: "nestjs-auth", title: "Authentication in NestJS", stack: "Backend", module: "APIs", progress: 70, lastVisited: "5 days ago" },
//   { id: "aws-s3", title: "Working with AWS S3", stack: "Cloud", module: "Storage", progress: 20, lastVisited: "1 week ago" },
// ]

export default function DashboardPage() {


  const [stacks, setStacks] = useState<StackSummary[]>([])
  const [recentLessons, setRecentLessons] = useState<any>([])
  const [openNewStack, setOpenNewStack] = useState(false)

  const router = useRouter()

  const { toast } = useToast()

  const { state, loaderStack } = useGlobalState()

  console.log(JSON.stringify(state), "State")

  useEffect(() => {
    const fetchDashboardContent = async () => {
      const payload = {
        userId: state.userId
      }

      try {
        const res = await api.post('/feature/getDashboardContent', payload).then(r => r.data)
        setStacks(res.stackSummary)
        setRecentLessons(res.recentlyVisited)

      } catch (err) {
        toast({
          title: "Error!",
          description: "Error while fetching dasboard content"
        })
      }
    }

    fetchDashboardContent()

  }, [])

  const saveNewStack = async (formValues: { name: string, description: string }) => {
    try {

      loaderStack(true)
      await api.post("/stacks/create", { ...formValues, userId: state.userId })
      loaderStack(false)
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
                setOpenNewStack(false)
                saveNewStack(values)

              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stacks Section */}
      {stacks.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stacks.map((stack) => {
              const progress = Math.round((stack.totalModules / Math.max(1, stack.totalLessons)) * 100)
              return (
                <Card
                  key={stack.id}
                  className="group transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  onClick={() => router.push(`/code-trail/stacks/${stack.slug}`)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <Link href={`/code-trail/stacks/${stack.slug}`} className="hover:underline">{stack.name}</Link>
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
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-muted rounded-lg">
          <div className="bg-muted/40 p-3 rounded-full mb-4">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No stacks yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start your journey by creating your first learning stack.
          </p>
        </div>
      )}



      {/* Recently Visited Lessons Section */}
      {recentLessons.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" /> Recently Visited Lessons
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentLessons.map((lesson: any) => (
              <Card key={lesson.id} className="group transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                onClick={() => router.push(`/code-trail/lessons/${lesson.slug}`)}>
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    <Link href={`/code-trail/lessons/${lesson.slug}`} className="hover:underline">
                      {lesson.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {lesson.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={lesson.progress} className="mb-2" />
                  <p className="text-xs text-muted-foreground">Last visited {lesson.lastVisitedAgo}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-muted rounded-lg">
          <div className="bg-muted/40 p-3 rounded-full mb-4">
            <Clock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No recent lessons</h3>
          <p className="text-sm text-muted-foreground">
            Your recently visited lessons will appear here as you start learning.
          </p>
        </div>
      )}

    </div>
  )
}
