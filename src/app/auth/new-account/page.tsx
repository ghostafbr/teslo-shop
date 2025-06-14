import {titleFont} from '@/config/fonts';
import Link from 'next/link';
import {RegisterForm} from "@/app/auth/new-account/ui/RegisterForm";

export default function NewAccount() {
    return (
        <div className="flex flex-col min-h-screen pt-32 sm:pt-30">

            <h1 className={`${titleFont.className} text-4xl mb-5`}>New Account</h1>
            <RegisterForm />
        </div>
    );
}
