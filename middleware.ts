import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    // Set header for any page request
    const headers = new Headers(request.headers);
    headers.set("x-current-page", request.nextUrl.pathname);

    return NextResponse.next({
        request: {
            headers,
        }
    });
}

const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)",
    ],
}