'use client';

import React from 'react';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800">
                    Log In to Your Account
                </h1>
                <form className="space-y-4">
                    <Input 
                        isRequired
                        label="Email" 
                        type="email" 
                        placeholder="Enter your email" 
                        required 
                        fullWidth 
                        aria-label="Email" 
                    />
                    <Input 
                        isRequired
                        label="Password" 
                        type="password" 
                        placeholder="Enter your password" 
                        required 
                        fullWidth 
                        aria-label="Password" 
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
                <div className="flex justify-between text-sm text-gray-500">
                    <Link href="/forget" color="warning">
                        Forgot password?
                    </Link>
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
}

export default LoginPage;
