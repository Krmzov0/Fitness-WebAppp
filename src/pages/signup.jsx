'use clinet'

import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile, AuthErrorCodes, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase';
import { Eye, Google } from 'iconsax-react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';

const Signup = () => {

    const router = useRouter();

    const googleAuth = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleAuth);

        router.push('/profile');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await updateProfile(user, { displayName });
                router.push('/profile')
            } catch (error) {
                if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                    setError('Email is already in use');
                }

                if (error.code === AuthErrorCodes.INVALID_EMAIL) {
                    setError('Invalid Email');
                }
            }
        } else {
            console.log('Passwords do not match')
        }
    };


    return (
        <div className='w-screen h-screen flex flex-col sm:flex-row '>
            <div className='flex sm:hidden'>
                <Header />
            </div>
            <div className='w-full sm:w-[45%] h-full flex flex-col justify-center items-start px-6 py-8 relative top-14 sm:top-0 sm:p-28'>
                <div className='flex flex-col gap-y-3'>
                    <h1 className='text-4xl sm:text-5xl regular text-[#fff]'>Get Started</h1>
                    <h2 className='text-md sm:text-lg text-[#ffffff9f]'>Welcome to <span className='text-[#C7FB04] cubano'>KALA<span className='cubano text-white'>FIT</span></span>, create account to start your experience </h2>
                </div>

                <div className='mt-6 w-full'>
                    <button onClick={signInWithGoogle} className='w-full sm:w-max sm:justify-normal justify-center flex gap-x-3 text-[#fff] items-center px-6 py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]'><Google size="24" color="#fff" variant="Broken" /> Sign in with Google</button>
                </div>

                <form onSubmit={handleSignUp} className='mt-10 w-full flex flex-col gap-y-6' >
                    <h2 className='mt-[-14px] left-1 relative text-[#ffffff9f]'>Or Sign Up with Email</h2>

                    <input
                        className='flex gap-x-3 bg-[#131313] placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]'
                        type="text"
                        placeholder="Username"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <div>
                        <input
                            className='flex gap-x-3 bg-[#131313] placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className='flex flex-col sm:flex-row gap-y-6 items-center gap-x-4'>
                        <div className='flex relative items-center w-full'>
                            <input
                                className='flex gap-x-3 bg-[#131313]  placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]'
                                type="password"
                                placeholder="Confirm Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Eye className='absolute right-4 cursor-pointer' size={24} color='#ffffff96' variant='Broken' />
                        </div>
                        <div className='flex relative items-center w-full'>
                            <input
                                className='flex gap-x-3 bg-[#131313]  placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]'
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Eye className='absolute right-4 cursor-pointer' size={24} color='#ffffff96' variant='Broken' />
                        </div>
                    </div>

                    <button className='w-full justify-center flex medium gap-x-3 text-[#000] bg-[#C7FB04] items-center px-6 py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]' type="submit">Sign Up</button>
                    {error && <div className='mt-3 ml-1 transition-all text-[#ff4643]'>
                        <p>{error}</p>
                    </div>}
                </form>

                <div className='mt-5 text-[#ffffff9f] regular flex items-center'>Already have an account?<button onClick={() => router.push('/signin')} className='cursor-pointer ml-1 text-[#C7FB04]'> Sign In</button></div>
            </div>
            <div className='w-full sm:w-[55%] h-full'></div>
        </div>
    )
}

export default Signup


