"use client"

import * as React from "react"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toaster"

type ToastType = {
    id: number
    title?: string
    description?: string
    variant?: "default" | "destructive"
}

const ToastContext = React.createContext<{
    toasts: ToastType[]
    toast: (toast: Omit<ToastType, "id">) => void
    dismiss: (id: number) => void
}>({
    toasts: [],
    toast: () => { },
    dismiss: () => { },
})

export function useToast() {
    return React.useContext(ToastContext)
}

export function ToastProviderWrapper({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<ToastType[]>([])

    const toast = React.useCallback((toast: Omit<ToastType, "id">) => {
        const id = Date.now()
        setToasts((prev) => [...prev, { id, ...toast }])
        setTimeout(() => dismiss(id), 4000) // auto-dismiss after 4s
    }, [])

    const dismiss = React.useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, toast, dismiss }}>
            <ToastProvider>
                {children}
                {toasts.map(({ id, title, description, variant }) => (
                    <Toast key={id} variant={variant}>
                        <div className="grid gap-1">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && <ToastDescription>{description}</ToastDescription>}
                        </div>
                        <ToastClose onClick={() => dismiss(id)} />
                    </Toast>
                ))}
                <ToastViewport />
            </ToastProvider>
        </ToastContext.Provider>
    )
}
