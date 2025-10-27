"use client"

import * as React from "react"
import { Highlight, themes } from "prism-react-renderer"
import { cn } from "@/lib/utils"

interface CodeViewProps {
    code: string
    language?: string
    className?: string
}

export function CodeView({ code, language = "tsx", className }: CodeViewProps) {
    return (
        <div className={cn("relative rounded-md border bg-muted/30", className)}>
            <Highlight code={code.trimEnd()} language={language} theme={themes.oneDark}>
                {({ className: cls, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={cn("overflow-x-auto p-4 text-sm", cls)} style={style}>
                        {tokens.map((line: any, i: number) => (
                            <div key={i} {...getLineProps({ line })}>
                                {line.map((token: any, key: number) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    )
}
