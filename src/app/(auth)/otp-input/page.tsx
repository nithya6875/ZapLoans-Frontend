"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";

export default function OTPInputPage() {
    const router = useRouter();
    const params = useSearchParams();
    const username = params.get("username") || "";

    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!username) {
            // no username query → back to signup
            router.replace("/signup");
        }
    }, [username, router]);

    const verifyOTP = async () => {
        if (code.length !== 6) {
            toast.error("Please enter the 6‑digit code");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/verify`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, otp: code }),
                }
            );
            const body = await res.json();
            if (!res.ok) throw new Error(body.message);

            toast.success("Email verified! Redirecting to login…");
            router.push("/login");
        } catch (err: any) {
            toast.error(err.message || "Invalid code");
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = async () => {
        toast.loading("Resending code…");
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/resend-otp`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username }),
                }
            );
            const body = await res.json();
            if (!res.ok) throw new Error(body.message);

            toast.dismiss();
            toast.success("A new code has been sent!");
        } catch (err: any) {
            toast.dismiss();
            toast.error(err.message || "Failed to resend OTP");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-md bg-black p-8 rounded-2xl shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold text-white">
                    Enter the 6‑digit code
                </h1>
                <OtpInput
                    value={code}
                    onChange={setCode}
                    numInputs={6}
                    renderSeparator={<span className="w-3" />}
                    renderInput={(props) => (
                        <input
                            {...props}
                            className="h-14 w-12 rounded-md bg-zinc-800 text-center text-xl font-semibold text-white outline-none focus:border-primary-purple focus:ring-2 focus:ring-primary-purple"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={1}
                        />
                    )}
                    shouldAutoFocus
                    containerStyle={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "0.75rem",
                    }}
                />

                <button
                    onClick={verifyOTP}
                    disabled={loading || code.length !== 6} // Disable when no OTP or during loading
                    className={`relative mt-5 block h-10 w-full rounded-md font-medium text-white transition group ${
                        loading || code.length !== 6
                            ? "cursor-not-allowed opacity-50"
                            : "bg-gradient-to-br from-zinc-900 to-zinc-800 hover:opacity-90"
                    }`}
                >
                    {loading ? "Verifying…" : "Verify OTP"}

                    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
                </button>

                <p className="mt-4 text-center text-sm text-gray-400">
                    Didn’t get a code?{" "}
                    <button
                        onClick={resendOTP}
                        className="font-medium text-primary-purple underline hover:text-white"
                    >
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
}
