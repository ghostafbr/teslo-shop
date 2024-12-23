import {titleFont} from '@/config/fonts';
import Link from 'next/link';

export default function NewAccount() {
    return (
        <div className="flex flex-col min-h-screen pt-32 sm:pt-30">

            <h1 className={`${titleFont.className} text-4xl mb-5`}>New Account</h1>

            <div className="flex flex-col">

                <label htmlFor="name">Complete name</label>
                <input
                    className="px-5 py-2 border bg-gray-200 rounded mb-5" id='name'
                    type="text"/>

                <label htmlFor="email">Email</label>
                <input
                    className="px-5 py-2 border bg-gray-200 rounded mb-5" id='email'
                    type="email"/>

                <label htmlFor="password">Password</label>
                <input
                    className="px-5 py-2 border bg-gray-200 rounded mb-5" id='password'
                    type="password"/>

                <button

                    className="btn-primary">
                    Create account
                </button>


                {/* divisor l ine */}
                <div className="flex items-center my-5">
                    <div className="flex-1 border-t border-gray-500"></div>
                    <div className="px-2 text-gray-800">O</div>
                    <div className="flex-1 border-t border-gray-500"></div>
                </div>

                <Link
                    href="/auth/login"
                    className="btn-secondary text-center">
                    Login
                </Link>

            </div>
        </div>
    );
}
