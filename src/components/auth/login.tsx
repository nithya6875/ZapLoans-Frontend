"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/signin`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );
            const body = await res.json();
            if (!res.ok) throw new Error(body.message);

            toast.success("Logged in successfully");
            router.push("/");
        } catch (err: any) {
            toast.error(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-black p-8 md:rounded-2xl md:p-8">
            <h2 className="text-2xl font-bold text-white">
                Log In to ZapLoans
            </h2>

            <form onSubmit={handleSubmit} className="my-8 space-y-4">
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email" className="text-white">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700"
                        required
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-6">
                    <Label htmlFor="password" className="text-white">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700"
                        required
                    />
                </LabelInputContainer>

                <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                        "group/btn cursor-pointer relative block h-10 w-full rounded-md bg-gradient-to-br from-zinc-900 to-zinc-800 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]",
                        loading
                            ? "cursor-not-allowed opacity-50"
                            : "hover:opacity-90"
                    )}
                >
                    {loading ? "Logging in…" : "Log In →"}
                    <BottomGradient />
                </button>

                <p className="mt-6 text-center text-sm text-neutral-400">
                    New to ZapLoans?{" "}
                    <a
                        href="/sign-up"
                        className="font-medium text-primary-purple underline underline-offset-4 transition-colors hover:text-white"
                    >
                        Sign up here
                    </a>
                </p>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
