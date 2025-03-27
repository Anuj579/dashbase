"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { validateForm } from '../validateForm';
import { useUser } from '@/context/UserContext';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function SignupPage() {
    const [inputType, setInputType] = useState('password');
    const toggleInputType = () => setInputType(prev => (prev === 'password' ? 'text' : 'password'));
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const { signUp } = useUser()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const router = useRouter();
    const handleSignup = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData, true);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            const data = signUp(formData)
            if (!data.success) {
                toast.error(data.error);
            } else {
                toast.success("Signed up successfully");
                router.push('/auth/login');
            }
        } catch (error) {
            console.log('ERROR IN SIGNUP:', error);
        }
    };

    return (
        <div className="flex items-center justify-center mx-4 min-h-screen">
            <Card className={`w-full max-w-md`}>
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                    <CardDescription>
                        Create a new account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <div className="relative">
                                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`} />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    autoComplete="username"
                                    className={`pl-10  ${errors.name && 'border-destructive focus-visible:ring-red-800'}`}
                                />
                            </div>
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`} />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className={`pl-10  ${errors.email && 'border-destructive focus-visible:ring-red-800'}`}
                                />
                            </div>
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`} />
                                <Input
                                    id="password"
                                    name="password"
                                    type={inputType}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    className={`pl-10  ${errors.password && 'border-destructive focus-visible:ring-red-800'}`}
                                />
                                <button className='absolute right-3 top-0 h-full' type='button' onClick={toggleInputType} aria-label={inputType === 'password' ? 'Show password' : 'Hide password'} title={inputType === 'password' ? 'Show password' : 'Hide password'}>
                                    {inputType === 'password' ? <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>
                        <Button className='w-full'>Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col space-y-4'>
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-card px-2 text-muted-foreground">OR</span>
                        </div>
                    </div>
                    <p className={`text-sm text-center w-full `}>
                        <span className='text-muted-foreground'>Already have an account?</span>
                        <Link href="/auth/login" className={`font-medium ml-1 hover:underline`}>
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
            <Toaster />
        </div>
    )
}

export default SignupPage