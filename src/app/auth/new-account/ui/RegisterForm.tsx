'use client';

import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import clsx from "clsx";
import {login, registerUser} from "@/actions";
import {useState} from "react";

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
        setErrorMessage('');
        const {name, email, password} = data;
        // server action
        const resp = await registerUser(name, email, password);

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        await login(email, password);
        window.location.replace('/');

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="name">Complete name</label>
            <input
                className={
                    clsx('px-5 py-2 border bg-gray-200 rounded mb-5',
                        {
                            'border-red-500': !!errors.name?.type
                        })
                }
                id='name'
                type="text"
                autoFocus
                {...register('name', {required: true})}
            />

            <label htmlFor="email">Email</label>
            <input
                className={
                    clsx('px-5 py-2 border bg-gray-200 rounded mb-5',
                        {
                            'border-red-500': !!errors.email?.type
                        })
                }
                type="email"
                {...register('email', {
                    required: true, pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email address'
                    }
                })}
            />

            <label htmlFor="password">Password</label>
            <input
                className={
                    clsx('px-5 py-2 border bg-gray-200 rounded mb-5',
                        {
                            'border-red-500': !!errors.name?.type
                        })
                }
                type="password"
                {...register('password', {required: true, minLength: 6})}
            />

            <span className="text-red-500">{errorMessage} </span>

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

        </form>
    );
};
