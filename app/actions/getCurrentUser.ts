import {getServerSession, Session} from "next-auth";
import prisma from "@/prisma/client";
import {authOptions} from "@/lib/authOptions";

const getCurrentUser = async () => {
    try {
        const session: Session | null = await getServerSession(authOptions as any)
        if (!session?.user?.name) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                name: session.user.name,
            }
        });

        if (!currentUser) {
            return null;
        }

        return {
            id: currentUser.id,
            name: currentUser.name,
            bio: currentUser.bio,
            image: currentUser.image,
            role: currentUser.role
        };
    } catch (error) {
        return null;
    }
}

export default getCurrentUser