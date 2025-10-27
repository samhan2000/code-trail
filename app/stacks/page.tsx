import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const stacks = [
    { id: "frontend", name: "Frontend", description: "UI frameworks, CSS, JS tooling" },
    { id: "backend", name: "Backend", description: "APIs, databases, services" },
    { id: "cloud", name: "Cloud", description: "AWS, CI/CD, infra" },
]

export default function StacksPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Stacks</h1>
                    <p className="text-sm text-muted-foreground">All your learning stacks</p>
                </div>
                <Button asChild>
                    <Link href="/stacks/new"><Plus className="mr-2 h-4 w-4" /> New Stack</Link>
                </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stacks.map((stack) => (
                    <Card key={stack.id}>
                        <CardHeader>
                            <CardTitle>
                                <Link href={`/stacks/${stack.id}`} className="hover:underline">{stack.name}</Link>
                            </CardTitle>
                            <CardDescription>{stack.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/stacks/${stack.id}`} className="text-sm text-primary hover:underline">View modules →</Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}


