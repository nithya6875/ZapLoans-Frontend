"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function SignUpPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [e.target.id]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = form;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/signup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password }),
                }
            );
            const body = await res.json();
            if (!res.ok) throw new Error(body.message);

            toast.success("OTP sent! Check your email");
            router.push(`/otp-input?username=${encodeURIComponent(username)}`);
        } catch (err: any) {
            toast.error(err.message || "Sign up failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-black p-8 md:rounded-2xl md:p-8 mt-12">
            <h2 className="text-2xl font-bold text-white">
                Sign Up to ZapLoans
            </h2>

            <form className="my-8 space-y-6" onSubmit={handleSubmit}>
                {(
                    [
                        "username",
                        "email",
                        "password",
                        "confirmPassword",
                    ] as const
                ).map((field) => (
                    <div key={field} className="flex flex-col space-y-2">
                        <Label htmlFor={field} className="text-white">
                            {field === "confirmPassword"
                                ? "Confirm Password"
                                : field.charAt(0).toUpperCase() +
                                  field.slice(1)}
                        </Label>
                        <Input
                            id={field}
                            type={
                                field.includes("password")
                                    ? "password"
                                    : field === "email"
                                    ? "email"
                                    : "text"
                            }
                            value={form[field]}
                            onChange={handleChange}
                            placeholder={
                                field === "email"
                                    ? "you@example.com"
                                    : field.includes("password")
                                    ? "••••••••"
                                    : "your_username"
                            }
                            className="bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700"
                            required
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                        "relative block h-10 w-full rounded-md font-medium text-white transition group",
                        "bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]",
                        loading
                            ? "cursor-not-allowed opacity-50"
                            : "hover:opacity-90"
                    )}
                >
                    {loading ? "Sending OTP…" : "Sign Up →"}

                    {/* Button hover gradient effect */}
                    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-400">
                Already have an account?{" "}
                <a
                    href="/login"
                    className="font-medium text-primary-purple underline underline-offset-4 transition-colors hover:text-white"
                >
                    Log in here
                </a>
            </p>
        </div>
    );
}
