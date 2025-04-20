import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/signup", "/otp-input", "/favicon.ico"];

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    // If the request is for a public path, continue
    if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Otherwise, check for our auth cookie
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
        // Not authenticated → redirect to login
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = "/login";
        return NextResponse.redirect(loginUrl);
    }

    // Token exists → allow request
    return NextResponse.next();
}

export const config = {
    // run on all routes except static files (handled by PUBLIC_PATHS above)
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
