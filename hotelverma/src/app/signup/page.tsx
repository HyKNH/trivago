'use client';

import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import axios from 'axios';

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('signup/api/auth', formData);
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800">
                    Create an Account
                </h1>
                {message && (
                    <p className={`text-center ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                        isRequired
                        label="Name"
                        name="name"
                        placeholder="Enter your name"
                        required
                        fullWidth
                        aria-label="Name"
                        onChange={handleChange}
                    />
                    <Input
                        isRequired
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        fullWidth
                        aria-label="Email"
                        onChange={handleChange}
                    />
                    <Input
                        isRequired
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        fullWidth
                        aria-label="Password"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        radius="full"
                        className="bg-gradient-to-tr from-orange-500 to-yellow-500 text-white shadow-lg"
                    >
                        Sign Up
                    </Button>
                </form>
                <p className="text-center text-gray-500">
                    Already have an account?{' '}
                    <Link href="/login" color="warning">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
