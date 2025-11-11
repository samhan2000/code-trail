"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Layers, Boxes, NotebookPen, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { signOut } from "next-auth/react"

const navItems = [
    { href: "/code-trail/dashboard", label: "Dashboard", icon: Home },
    { href: "/code-trail/stacks", label: "Stacks", icon: Layers },
    // { href: "/code-trail/modules", label: "Modules", icon: Boxes },
    // { href: "/code-trail/lessons", label: "Lessons", icon: NotebookPen },
    { href: "/code-trail/signOut", label: "Sign Out", icon: LogOut, action: "signOut" }
]

export function Sidebar({ onClose }: { onClose: () => void }) {
    const pathname = usePathname()

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex">
                {/* Overlay with fade */}
                <motion.div
                    className="fixed inset-0 bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                />

                {/* Sidebar panel with slide in/out */}
                <motion.aside
                    initial={{ x: -260 }}
                    animate={{ x: 0 }}
                    exit={{ x: -260 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="relative z-50 w-64 h-full border-r bg-background/90 backdrop-blur shadow-lg p-2"
                >
                    <div className="px-4 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Navigation
                    </div>
                    <nav className="grid gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const active =
                                pathname === item.href ||
                                pathname?.startsWith(item.href + "/")

                            return (
                                <motion.div
                                    key={item.href}
                                    whileHover={{ x: 6 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {item?.action === 'signOut' ? <div onClick={() => signOut()} className={cn(
                                        "group cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                        active
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                                    )}>
                                        <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                                        <span>{item.label}</span></div> : <Link
                                            href={item.href}
                                            className={cn(
                                                "group flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                                active
                                                    ? "bg-accent text-accent-foreground"
                                                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                                            )}
                                            onClick={onClose} // auto-close when clicking a link
                                        >
                                        <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                                        <span>{item.label}</span>
                                    </Link>}

                                </motion.div>
                            )
                        })}
                    </nav>
                </motion.aside>
            </div>
        </AnimatePresence>
    )
}
