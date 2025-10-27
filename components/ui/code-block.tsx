"use client"

import * as React from "react"
import { Highlight, themes } from "prism-react-renderer"
import { cn } from "@/lib/utils"
import { CodeEditor } from "./code-editor"
import { CodeView } from "./code-view"
import { Pencil } from "lucide-react"
import { Button } from "./button"
import { useState } from "react"

interface CodeBlockProps {
    code: string
    language?: string
    className?: string
    editable?: boolean
    onChange?: () => void,
}

export function CodeBlock({ code, language = "tsx", className, onChange, editable }: CodeBlockProps) {

    const [codeEditable, setCodeEditable] = useState(editable)

    return <>
        <div className="flex justify-end">
            <Button onClick={() => setCodeEditable(true)} variant="ghost" size="sm" aria-label="Edit">
                <Pencil className="h-4 w-4 cursor-pointer" />
            </Button>
        </div>
        {codeEditable ? <CodeEditor code={code} onChange={onChange} /> : <CodeView code={code} className={className} language={language} />}
    </>
}
