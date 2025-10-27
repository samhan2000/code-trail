"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Mail, Lock, Chrome } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("custom-login", { email, password, redirect: true });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
            <div className="w-full max-w-sm rounded-xl bg-[#121212] p-8 shadow-xl border border-white/10">
                {/* Logo / Brand */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="/logo.svg"
                        alt="Logo"
                        className="h-10 mb-2"
                    />
                    <h1 className="text-xl font-semibold tracking-wide">SmartForm Engine</h1>
                </div>

                {/* Google Sign-In */}
                <button
                    onClick={() => signIn("google")}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-white text-black py-2 font-medium transition hover:bg-gray-200"
                >
                    <Chrome className="w-4 h-4" />
                    Sign in with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-2 my-6">
                    <div className="h-px flex-1 bg-white/20" />
                    <span className="text-xs uppercase text-white/40">or</span>
                    <div className="h-px flex-1 bg-white/20" />
                </div>

                {/* Email / Password Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border border-white/20 rounded-md py-2 pl-9 pr-3 text-sm placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border border-white/20 rounded-md py-2 pl-9 pr-3 text-sm placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end text-xs text-white/50">
                        <a href="#" className="hover:text-red-400">Forgot your password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-red-600 py-2 font-medium transition hover:bg-red-700"
                    >
                        SIGN IN
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-white/50">
                    Don’t have an account?{" "}
                    <a href="#" className="text-red-400 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
