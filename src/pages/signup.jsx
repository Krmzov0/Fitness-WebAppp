import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile, AuthErrorCodes, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase';
import { Eye, EyeSlash, Google } from 'iconsax-react';
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

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(null);
    const [passwordError, setpasswordError] = useState(null);

    useEffect(() => {
        if (password === confirmPassword) {
            setpasswordError(null); // Clear the password error if the passwords match
        }
    }, [password, confirmPassword]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setIsLoading(true);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await updateProfile(user, { displayName });
                router.push('/profile')
            } catch (error) {
                if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                    setError('Email is already in use');
                } 
            }
            setIsLoading(false);
        } else {
            setpasswordError('Passwords do not match');
        }
    };


    const togglePassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className='w-screen h-full md:h-screen flex flex-col md:flex-row '>
            <div className='flex md:hidden'>
                <Header />
            </div>
            <div className='w-full md:w-[45%] h-full flex flex-col justify-center items-start px-6 py-8 relative top-14 md:top-0 md:p-28'>
                <div className='flex flex-col gap-y-3'>
                    <h1 className='text-4xl md:text-5xl blackk text-[#fff]'>Get Started</h1>
                    <h2 className='text-md md:text-lg text-[#ffffff9f]'>Welcome to <span className='text-[#C7FB04] cubano'>KALA<span className='cubano text-white'>FIT</span></span>, create account to start your experience </h2>
                </div>

                <div className='mt-6 w-full'>
                    <button onClick={signInWithGoogle} className='w-full md:w-max md:justify-normal justify-center flex gap-x-3 text-[#fff] items-center px-6 py-4 rounded-xl border border-[#ffffff15] transition-all hover:border-[#ffffff9f]'><Google size="24" color="#fff" variant="Broken" /> Sign In with Google</button>
                </div>

                <form onSubmit={handleSignUp} className='mt-10 w-full flex flex-col gap-y-6' >
                    <h2 className='mt-[-14px] left-1 relative text-[#ffffff9f]'>Or Sign Up with Email</h2>

                    <input
                        className='flex gap-x-3 bg-[#131313] placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff15] transition-all hover:border-[#ffffff9f]'
                        type="text"
                        placeholder="Username"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <div>
                        <input
                            className='flex gap-x-3 bg-[#131313] placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff15] transition-all hover:border-[#ffffff9f]'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className='flex flex-col md:flex-row gap-y-6 items-center gap-x-4'>
                        <div className='flex relative items-center w-full'>
                            <input
                                className='flex gap-x-3 bg-[#131313]  placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff15] transition-all hover:border-[#ffffff9f]'
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {showPassword ? <Eye onClick={togglePassword} className='absolute right-4 cursor-pointer' size={24} color='#ffffff96' variant='Broken' /> : <EyeSlash onClick={togglePassword} className='absolute right-4 cursor-pointer' size={24} color='#ffffff96' variant='Broken' />}
                        </div>
                        <div className='flex relative items-center w-full'>
                            <input
                                className='flex gap-x-3 bg-[#131313]  placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff15] transition-all hover:border-[#ffffff9f]'
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {showPassword ? <Eye onClick={togglePassword} className='absolute right-4 cursor-pointer' size={24} color='#ffffff96' variant='Broken' /> : <EyeSlash onClick={togglePassword} className='absolute right-4 cursor-pointer' size={24} color='#ffffff96' variant='Broken' />}
                        </div>
                    </div>

                    <button className='w-full justify-center text-lg flex medium gap-x-3 text-[#000] bg-[#C7FB04] items-center px-6 py-4 rounded-xl border border-[#ffffff15] transition-all' type="submit">
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                    {error && <div className='ml-1 transition-all text-[#ff4643]'>
                        <p>{error}</p>
                    </div>}

                    {passwordError &&
                        <div className='ml-1 transition-all text-[#ff4643]'>
                            <p>{passwordError}</p>
                        </div>
                    }
                </form>

                <div className='mt-5 text-[#ffffff9f] regular flex items-center'>Already have an account?<button onClick={() => router.push('/signin')} className='cursor-pointer ml-1 text-[#C7FB04]'> Sign In</button></div>
            </div>
            <div className='w-full md:w-[55%] h-full'></div>
        </div>
    )
}

export default Signup


