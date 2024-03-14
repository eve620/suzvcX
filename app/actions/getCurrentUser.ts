import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";

const getCurrentUser = async () => {
    try {
        const session = await getServerSession(authOptions)
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