import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    // Set header for any page request
    const headers = new Headers(request.headers);
    headers.set("x-current-page", request.nextUrl.pathname);

    //this is route protection feature
    //if user is authenticated and tries to access public pages, redirect them app entry page
    //if user is not authenticated and tries to access auth pages, redirect them to sign in page

    const token = await getToken({ 
        req: request,
        secret: process.env.AUTH_SECRET
     }); //and token to verify if user is authenticated

    const isAuth = !!token //if token is true
    const pathname = request.nextUrl.pathname; //this is the current path

    // This protects the auth user to access public pages
    //here is the list of public pages
    const publicPages = [
        "/",
        '/signin', 
        '/signup', 
        "/forgot-password", 
        "/reset-password",
        "/verify-email",
        "/privacy",
        "/terms",
    ];

    // If user is authenticated and tries to access auth pages, redirect them
    if (isAuth && publicPages.includes(pathname)) {
        return NextResponse.redirect(new URL('/enhancer', request.url))
    }

    // If user is not authenticated and tries to access auth pages, redirect them
    if (!isAuth && !publicPages.includes(pathname)) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next({
        request: {
            headers,
        }
    });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo-min.png|public).*)"],
}