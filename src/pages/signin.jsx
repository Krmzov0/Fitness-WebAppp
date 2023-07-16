import Header from '@/components/Header'
import { auth } from '@/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Eye, EyeSlash, Google } from 'iconsax-react'
import { useRouter } from 'next/router'
import React from 'react'

const Signin = () => {

    const router = useRouter();

    const googleAuth = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleAuth);
        router.push('/profile');
    }

    return (
        <div className='w-screen h-screen flex flex-col sm:flex-row '>
            <div className='flex sm:hidden'>
                <Header />
            </div>

            <div className='w-full sm:w-[45%] h-full flex flex-col justify-center items-start px-6 py-8 relative top-14 sm:top-0 sm:p-28'>
                <div className='flex flex-col gap-y-3'>
                    <h1 className='text-4xl sm:text-5xl regular text-[#fff]'>Sign in</h1>
                    <h2 className='regular text-md sm:text-lg text-[#ffffff9f]'>Welcome to <span className='text-[#C7FB04] cubano'>KALA<span className='cubano text-white'>FIT</span></span>, sign in to your account</h2>
                </div>

                <div className='mt-6 w-full'>
                    <button onClick={signInWithGoogle} className='w-full sm:w-max sm:justify-normal justify-center flex gap-x-3 text-[#fff] items-center px-6 py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]'><Google size="24" color="#fff" variant="Broken" /> Sign in with Google</button>
                </div>

                <form className='mt-10 w-full flex flex-col gap-y-6' >
                    <h2 className='mt-[-14px] left-1 relative text-[#ffffff9f]'>Or Sign In with Email</h2>
                    <input
                        className='flex gap-x-3 bg-[#131313] placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]'
                        type="email"
                        placeholder="Email"

                    />
                    <div className='flex flex-col sm:flex-row gap-y-6 items-center gap-x-4'>
                        <div className='flex relative items-center w-full'>
                            <input
                                className='flex gap-x-3 bg-[#131313]  placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]'
                                type="password"
                                placeholder="Confirm Password"

                            />
                            <Eye className='absolute right-4 cursor-pointer' size={24} color='#ffffff96' variant='Broken' />
                        </div>
                        <div className='flex relative items-center w-full'>
                            <input
                                className='flex gap-x-3 bg-[#131313]  placeholder:text-[#ffffff96] text-[#fff] items-center px-4 w-full py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]'
                                type="password"
                                placeholder="Confirm Password"

                            />
                            <EyeSlash className='absolute right-4 cursor-pointer' size={24} color='#ffffff96' variant='Broken' />
                        </div>
                    </div>

                    <button className='w-full justify-center flex medium gap-x-3 text-[#000] bg-[#C7FB04] items-center px-6 py-4 rounded-xl border border-[#ffffff0c] transition-all hover:border-[#ffffff9f]' type="submit">Sign In</button>
                </form>

                <div className='mt-5 text-[#ffffff9f] regular flex items-center'>Don't have an account? <button onClick={() => router.push('/signup')} className='cursor-pointer ml-1 text-[#C7FB04]'> Sign up</button></div>
            </div>
            <div className='w-full sm:w-[55%] h-full'></div>
        </div>
    )
}

export default Signin