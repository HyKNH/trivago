'use client';
{/*
temp change when api works and database
remove { preventDefault: () => void; } and  
{ target: { value: React.SetStateAction<string>; };  
*/}

import React, { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setMessage("If this email is registered, you will receive a password reset link shortly.");
    };
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Forgot Password</h1>
                <p className="text-gray-600 mb-8 text-center">
                    Enter your email address below to receive a password reset link.
                </p>
                {message && (
                    <p className="text-green-500 text-center mb-4">
                        {message}
                    </p>
                )}
                <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
                    <Input
                        type="email"
                        label="Email Address"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <Button
                        type="submit"
                        radius="full"
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 font-semibold shadow-md hover:shadow-lg"
                    >
                        Send Reset Link
                    </Button>
                </form>
                <div className="text-center mt-4">
                    <a href="/login" className="text-orange-500 hover:underline">
                        Back to Login
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
