"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, Chrome, User, FolderPen } from "lucide-react";
import { useToast } from "@/components/ui/useToast";
import api from "@/lib/axios-client";
import { useGlobalState } from "@/app/context/GlobalState";

export default function LoginPage() {
    const [formValues, setFormValues] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const { toast } = useToast()
    const router = useRouter()
    const { loaderStack } = useGlobalState()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.values(formValues).some(val => val.trim() === "")) {
            toast({
                title: "Error!",
                description: "Please fill all mandatory fields"
            })
            return
        }

        if (formValues.password != formValues.confirmPassword) {
            toast({
                title: "Error!",
                description: "Password does not match"
            })
            return
        }

        // API call to register the user
        try {
            loaderStack(true)
            setLoading(true)
            await api.post("/oauth/register", formValues)
            setLoading(false)
            loaderStack(false)
            toast({
                title: "Success!",
                description: "User added succesfully"
            })
            router.push("/auth/login")
        } catch (err: any) {
            setLoading(false)
            loaderStack(false)
            console.error(`Error while registering user, ${err}`)
            if (err?.response?.data?.field === "email") {
                setError("This email is already registered");
            } else if (err?.response?.data?.field === "username") {
                setError("This username is already taken");
            } else {
                setError("Something went wrong. Try again later.");
            }
        }
    };

    const handleFormChange = (e: any) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }


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
                        <FolderPen className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formValues.name}
                            onChange={handleFormChange}
                            className="w-full bg-transparent border border-white/20 rounded-md py-2 pl-9 pr-3 text-sm placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formValues.username}
                            onChange={handleFormChange}
                            className="w-full bg-transparent border border-white/20 rounded-md py-2 pl-9 pr-3 text-sm placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>
                    {/* Email */}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleFormChange}
                            className="w-full bg-transparent border border-white/20 rounded-md py-2 pl-9 pr-3 text-sm placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>

                    {/* Password */}

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleFormChange}
                            className="w-full bg-transparent border border-white/20 rounded-md py-2 pl-9 pr-3 text-sm placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>

                    {/* Confirm Password */}

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={formValues.confirmPassword}
                            onChange={handleFormChange}
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
                        className="w-full rounded-md !bg-red-600 py-2 font-medium cursor-pointer transition !hover:bg-red-700"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
