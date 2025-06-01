import NextAuth from "next-auth";
import {authConfig} from "@/auth.config";


export default NextAuth(authConfig);

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|.*\\.png$).*)", // Match all routes except API routes and static files
        // Exclude API routes and static files from authentication
    ],
}
