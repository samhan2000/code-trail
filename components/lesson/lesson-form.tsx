"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CodeEditor } from "../ui/code-editor"
import { useEffect, useState } from "react"

export type LessonFormValues = {
    title: string
    notes: string
    code: string
}

export function LessonForm({ initialValues, onSubmit, onCancel }: {
    initialValues?: Partial<LessonFormValues>
    onSubmit: (values: LessonFormValues) => void
    onCancel?: () => void
}) {
    const [values, setValues] = useState<LessonFormValues>({
        title: initialValues?.title ?? "",
        notes: initialValues?.notes ?? "",
        code: initialValues?.code ?? "",
    })

    useEffect(() => {
        setValues({
            title: initialValues?.title ?? "",
            notes: initialValues?.notes ?? "",
            code: initialValues?.code ?? "",
        })
    }, [initialValues])

    function handleChange<K extends keyof LessonFormValues>(key: K, value: LessonFormValues[K]) {
        setValues((v) => ({ ...v, [key]: value }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit(values)
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="title">Title</label>
                <Input id="title" value={values.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Lesson title" required />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="notes">Notes</label>
                <Textarea id="notes" value={values.notes} onChange={(e) => handleChange("notes", e.target.value)} placeholder="What did you learn?" rows={5} />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="code">Code Snippet</label>
                <CodeEditor defaultLanguage="javascript" code={initialValues?.code ?? ""} onChange={(value) => handleChange("code", value)} />
            </div>

            <div className="flex justify-end gap-2">
                {onCancel && (
                    <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                )}
                <Button className="cursor-pointer" type="submit">Save</Button>
            </div>
        </form>
    )
}