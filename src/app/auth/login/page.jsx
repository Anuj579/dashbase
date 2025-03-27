"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { validateForm } from '../validateForm';
import { useUser } from '@/context/UserContext';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function LoginPage() {
    const [inputType, setInputType] = useState('password')
    const toggleInputType = () => setInputType(prev => (prev === 'password' ? 'text' : 'password'));
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({})
    const { login, user } = useUser()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    const router = useRouter()
    const handleLogin = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData, false);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            const data = login(formData)
            if (!data.success) {
                toast.error(data.error)
            } else {
                toast.success("Logged In")
                router.push('/dashboard')
            }
        } catch (error) {
            console.log("FAILED TO LOGIN:", error);
        }
    }

    useEffect(() => {
        if (user !== null) {
            router.push('/dashboard')
        }
    }, [user])

    return (
        <div className="flex items-center justify-center mx-4 min-h-screen">
            <Card className={`w-full max-w-md`}>
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                        <Button className="w-full mt-2">Login</Button>
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
                    <p className={`text-sm text-center w-full`}>
                        <span className='text-muted-foreground'>Don't have an account?</span>
                        <Link href="/auth/signup" className={`font-medium ml-1 hover:underline`}>
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
            <Toaster />
        </div>
    )
}

export default LoginPage