import NextAuth, {type NextAuthConfig} from 'next-auth';
import Credentials from '@auth/core/providers/credentials';
import {z} from 'zod';
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },

    callbacks: {

        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true; // Allow access to other pages

        },

        jwt({token, user}) {
            // If user is defined, it means this is the first time the user is authenticated
            if (user) {
                // Store user data in the token
                token.data = user;
            }

            return token;
        },

        session({session, token, user}) {
            session.user = token.data ?? (user as any);

            return session;
        },
    },

    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(6)})
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const {email, password} = parsedCredentials.data;
                const user = await prisma.user.findUnique({
                    where: {email: email.toLowerCase()},
                });

                if (!user) return null;

                // Compare password hash
                if (!bcrypt.compareSync(password, user.password)) return null;

                // Return user
                const {password: _, ...userWithoutPassword} = user;
                return user;
            },
        }),
    ],
};

export const {signIn, signOut, auth, handlers} = NextAuth(authConfig);
