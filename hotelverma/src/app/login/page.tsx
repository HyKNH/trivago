'use client';

import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState<string | null>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('login/api/auth', formData);
            setMessage(response.data.message);

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }

            setTimeout(() => {
                window.location.href = "/";
            }, 5000); 

        } catch (error: any) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800">
                    Log In to Your Account
                </h1>
                {message && (
                    <p className={`text-center ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                        placeholder="Enter your password"
                        required
                        fullWidth
                        aria-label="Password"
                        onChange={handleChange}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                              {isVisible ? (
                                <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none"/>
                              ) : (
                                <FaRegEye className="text-2xl text-default-400 pointer-events-none"/>
                              )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        radius="full"
                        className="bg-gradient-to-tr from-orange-500 to-yellow-500 text-white shadow-lg"
                    >
                        Log In
                    </Button>
                </form>
                <div className="flex items-center justify-center space-x-2">
                    <span className="h-px w-16 bg-gray-300"></span>
                    <span className="text-sm text-gray-400">or</span>
                    <span className="h-px w-16 bg-gray-300"></span>
                </div>
                <div className="flex justify-center text-sm text-gray-500">
                    <span>
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" color="warning">
                            Sign up
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
