"use client"

import { useToast } from '@/components/ui/useToast';
import { User, Lock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Login = () => {
    const searchParams = useSearchParams();
    const redirect_uri = searchParams.get("redirect_uri");
    const state = searchParams.get("state");
    const client_id = searchParams.get("client_id");
    const errorParam = searchParams.get("error");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        if (errorParam) {
            toast({
                title: "Error!",
                description: decodeURIComponent(errorParam)
            })
        }
    }, [errorParam])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = document.createElement("form");
        form.method = "POST";
        form.action = `${process.env.NEXT_PUBLIC_API_URL}/oauth/login`;

        const fields = { username, password, redirect_uri, state, client_id };
        Object.entries(fields).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value || "";
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
            <div className="w-full max-w-sm rounded-xl bg-[#121212] p-8 shadow-xl border border-white/10">
                <div className="flex flex-col items-center mb-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-book-open h-8 w-8 text-primary"
                    >
                        <path d="M12 7v14" />
                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 0 0 0-3-3z" />
                    </svg>
                    <h1 className="text-xl font-semibold tracking-wide">Code Trail</h1>
                </div>

                {/* <button
                    onClick={() => (window.location.href = "/api/auth/signin/google")}
                    className="flex w-full items-center justify-center gap-2 rounded-md text-black py-2 font-medium transition !hover:bg-gray-200 !bg-white cursor-pointer"
                >
                    <Chrome className="w-4 h-4" />
                    Sign in with Google
                </button>

                <div className="flex items-center gap-2 my-6">
                    <div className="h-px flex-1 bg-white/20" />
                    <span className="text-xs uppercase text-white/40">or</span>
                    <div className="h-px flex-1 bg-white/20" />
                </div> */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md !bg-red-600 py-2 font-medium transition hover:bg-red-700"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-white/60">
                    <span>New here? </span>
                    <button
                        onClick={() => router.push("/auth/register")}
                        className="text-red-400 font-medium cursor-pointer hover:underline hover:text-red-300 transition-colors"
                    >
                        Create an account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login