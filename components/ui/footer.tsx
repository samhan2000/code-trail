"use client"

import { Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="w-full mt-12 border-t border-white/10 backdrop-blur-sm bg-transparent">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-4 text-sm text-white/60">
                <p className="mb-3 md:mb-0">
                    © {new Date().getFullYear()} <span className="text-white/80 font-medium">Code Trail</span>. All rights reserved.
                </p>

                <div className="flex items-center gap-5">
                    <Link
                        href="https://github.com/"
                        target="_blank"
                        className="transition hover:text-white/90"
                    >
                        <Github className="w-4 h-4" />
                    </Link>
                    <Link
                        href="https://twitter.com/"
                        target="_blank"
                        className="transition hover:text-white/90"
                    >
                        <Twitter className="w-4 h-4" />
                    </Link>
                    <Link
                        href="https://linkedin.com/"
                        target="_blank"
                        className="transition hover:text-white/90"
                    >
                        <Linkedin className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
