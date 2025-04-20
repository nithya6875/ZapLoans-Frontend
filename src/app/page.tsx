import { cookies } from "next/headers";
import Link from "next/link";
import SlideUpButton from "@/components/SlideUpButton";
import { dbFetch } from "@/lib/dbFunctions";

interface User {
    id: number;
    username: string;
    email: string;
}

export default async function Home() {
    let user: User | null = null;

    try {
        // 1) Call (and if necessary await) cookies() to get the store
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        // 2) If we have a token, hit the get-user endpoint
        if (token) {
            user = await dbFetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        }
    } catch {
        user = null;
    }

    // 3) Two different UIs depending on auth state
    if (user) {
        return (
            <div className="mx-auto max-w-3xl p-8 mt-12 space-y-6">
                <h1 className="text-3xl font-bold">
                    Welcome back, {user.username}!
                </h1>
                <p className="text-lg text-gray-300">
                    What would you like to do today?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SlideUpButton>
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </SlideUpButton>
                    <SlideUpButton>
                        <Link href="/profile">View Profile</Link>
                    </SlideUpButton>
                </div>
            </div>
        );
    } else {
        return (
            <div className="mx-auto max-w-md p-8 mt-12 text-center">
                <h1 className="text-2xl text-white font-bold">
                    You’re not signed in
                </h1>
                <SlideUpButton>
                    <Link href="/login">Log In</Link>
                </SlideUpButton>
                <p className="mt-4 text-gray-400">
                    New here?{" "}
                    <Link
                        href="/sign-up"
                        className="font-medium text-primary-purple underline underline-offset-4 transition-colors hover:text-white"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        );
    }
}
