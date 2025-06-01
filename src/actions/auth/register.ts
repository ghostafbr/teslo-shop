'use server';

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (name: string, email: string, password: string) => {
    try {

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password, 10)
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        },);

        return {
            ok: true,
            user,
            message: 'User registered successfully'
        }

    } catch (err) {
        console.error('Error registering user:', err);

        return {
            ok: false,
            message: 'Error registering user'
        }

    }
}
