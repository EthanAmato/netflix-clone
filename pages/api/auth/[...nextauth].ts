// special file recognized by NextAuth dependency
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from '@/lib/prismadb';
import { compare } from "bcrypt";

export default NextAuth({
    providers: [
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password) {
                    throw new Error('Email and Password required');
                }
                //since we require users to have a unique email, this
                //allows us to find a proper user/password pair
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user || !user.hashedPassword) {
                    throw new Error('User does not exist')
                }

                //use bcrypt to see if user is logging in with the right password
                const isCorrectPassword = await compare(
                    credentials.password, 
                    user.hashedPassword
                )

                if (!isCorrectPassword) {
                    throw new Error("Incorrect password")
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        // the strategy we use to maintain session
        // we are choosing to use JSON Web Tokens here
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
})