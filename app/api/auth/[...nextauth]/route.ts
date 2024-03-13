import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/prisma/client";
import {compare} from "bcrypt"
import {PrismaAdapter} from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {strategy: 'jwt'},
    pages: {signIn: "/login"},
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                account: {},
                password: {},
            },

            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        account: credentials?.account
                    }
                })
                if (!user) return null
                const passwordCorrect = await compare(
                    credentials?.password || '',
                    user.password
                )
                if (passwordCorrect) return {id: String(user.id), account: user.account, role: user.role}
                return null
            }
        })
    ],
    callbacks: {
        async jwt({user, token}) {
            if (user) {  // Note that this if condition is needed
                token.user = {...user}
            }
            return token
        },
        async session({session, token}) {
            if (token?.user) { // Note that this if condition is needed
                session.user = token.user;
            }
            return session
        },
    },
}
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}