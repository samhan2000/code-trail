"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export type StackFormValues = {
    name: string
    description: string
}

export function NewStackForm({ onSubmit, onCancel }: {
    onSubmit: (values: StackFormValues) => void
    onCancel?: () => void
}) {
    const [values, setValues] = React.useState<StackFormValues>({
        name: "",
        description: ""
    })

    function handleChange<K extends keyof StackFormValues>(key: K, value: StackFormValues[K]) {
        setValues((v) => ({ ...v, [key]: value }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit(values)
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="title">Name</label>
                <Input id="title" value={values.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Title" required />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="notes">Description</label>
                <Textarea id="notes" value={values.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="What's exciting?" rows={5} />
            </div>

            <div className="flex justify-end gap-2">
                {onCancel && (
                    <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                )}
                <Button type="submit">Save</Button>
            </div>
        </form>
    )
}


