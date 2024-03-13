import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export interface SessionUser {
    id: string
    account: string
    role: UserRole
}

enum UserRole {
    Admin,
    User
}

export default async function getCurrentUser() {
    const session: { user: SessionUser } | null = await getServerSession(authOptions)
    if (session?.user) return session.user
    return null


}