import {NextRequest, NextResponse} from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export {default} from "next-auth/middleware"


export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/aaa')) {
    }
}

export const config = {matcher: []}