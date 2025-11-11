"use client"

import React, { useEffect, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { oneDark } from "@codemirror/theme-one-dark"
import { javascript } from "@codemirror/lang-javascript"
import { html } from "@codemirror/lang-html"
import { json } from "@codemirror/lang-json"
import { css } from "@codemirror/lang-css"
import { sql } from "@codemirror/lang-sql"
import prettier from "prettier/standalone"
import * as prettierBabel from "prettier/plugins/babel"
import prettierEstree from "prettier/plugins/estree"
import * as prettierHtml from "prettier/plugins/html"
import * as prettierPostCss from "prettier/plugins/postcss"
import * as prettierSql from "prettier-plugin-sql"

import { Copy, Check, Braces, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const languageOptions = {
    javascript: { name: "JavaScript / TSX", ext: javascript({ jsx: true }) },
    html: { name: "HTML", ext: html() },
    json: { name: "JSON", ext: json() },
    css: { name: "CSS", ext: css() },
    sql: { name: "SQL", ext: sql() },
}

interface EditableCodeBlockProps {
    code: string
    defaultLanguage?: keyof typeof languageOptions
    className?: string
    onChange?: (value: string) => void
}

export function CodeEditor({
    code,
    defaultLanguage = "javascript",
    className,
    onChange,
}: EditableCodeBlockProps) {
    const [value, setValue] = useState(code)
    const [language, setLanguage] = useState(defaultLanguage)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (value && language) {
            handleFormat()
        }
    }, [])

    useEffect(() => {
        setValue(code)
    }, [code])

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    const handleFormat = async () => {
        try {
            const formatted = await prettier.format(value, {
                parser:
                    language === "json"
                        ? "json"
                        : language === "html"
                            ? "html"
                            : language === "css"
                                ? "css"
                                : language === "sql"
                                    ? "sql"
                                    : "babel",
                plugins: [prettierBabel, prettierHtml, prettierPostCss, prettierEstree, prettierSql],
                semi: false,
                singleQuote: true,
                tabWidth: 2,
            })

            setValue(formatted)
            onChange?.(formatted)
        } catch (err) {
            console.error("Format error:", err)
        }
    }

    return (
        <div className="relative rounded-md border bg-muted/30">
            <div className="flex justify-between items-center px-3 py-2 border-b bg-muted/50 rounded-t-md">
                <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-muted-foreground" />
                    <select
                        className="text-sm bg-background outline-none"
                        value={language}
                        onChange={(e) =>
                            setLanguage(e.target.value as keyof typeof languageOptions)
                        }
                    >
                        {Object.entries(languageOptions).map(([key, { name }]) => (
                            <option key={key} value={key}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-2">
                    <Button className="cursor-pointer" variant="ghost" type="button" size="sm" onClick={handleFormat}>
                        <Braces className="w-4 h-4 mr-1" />
                        Format
                    </Button>
                    <Button className="cursor-pointer" type="button" variant="ghost" size="sm" onClick={handleCopy}>
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied" : "Copy"}
                    </Button>
                </div>
            </div>

            <CodeMirror
                value={value}
                theme={oneDark}
                minHeight="100px"
                extensions={[languageOptions[language].ext]}
                onChange={(val) => {
                    setValue(val)
                    onChange?.(val)
                }}
            />
        </div>
    )
}
