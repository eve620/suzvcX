import {NextRequest, NextResponse} from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {getToken} from "next-auth/jwt";

export {default} from "next-auth/middleware"


export async function middleware(request: NextRequest) {
    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET});
    if (!token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', 'true');
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {matcher: ['/note']}