'use client'

import React, { useState } from 'react';
import { auth } from '../pages/firebase'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { CloseSquare, HambergerMenu, User } from 'iconsax-react'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Header = () => {

    const router = useRouter();

    const [toggleMenu, settoggleMenu] = useState(false)

    const handleMenuToggle = () => {
        toggleMenu ? settoggleMenu(false) : settoggleMenu(true)
    }

    const [user, setuser] = useAuthState(auth)

    const googleAuth = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleAuth);
    }

    const handleSignOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className='container absolute mx-auto justify-between items-center px-6 sm:px-12 py-6 sm:py-8 flex z-[999] gap-x-5'>
            <div className='flex justify-between items-center w-full sm:w-max'>
                <div className='cubano text-3xl text-[#fff] cursor-pointer' onClick={() => router.push('/')}><span className='text-[#C7FB04] cubano'>FIT</span>GOD</div>

                <div className='flex gap-x-4 items-center flex-row-reverse'>
                    <HambergerMenu onClick={handleMenuToggle} className='sm:hidden flex' variant='Broken' size="32" color="#fff" />
                    <User size="28" className='sm:hidden flex' variant='Broken' color="#fff" />
                </div>
            </div>

            <div className={toggleMenu ? 'border h-screen w-screen sm:h-min sm:w-max sm:relative fixed sm:bg-transparent bg-[#C7FB04]  flex-col sm:flex-row left-0 top-0 sm:flex items-center' : 'items-center sm:flex hidden' }>
                <div className='flex sm:hidden justify-between items-center w-full sm:w-max px-6 py-6'>
                    <div className='cubano text-3xl text-[#000] cursor-pointer' onClick={() => router.push('/')}><span className='text-[#000] cubano'>FIT</span>GOD</div>

                    <div className='flex gap-x-5 items-center flex-row-reverse'>
                        <CloseSquare onClick={handleMenuToggle} className='sm:hidden flex' variant='Broken' size="32" color="#000" />
                        <User size="28" className='sm:hidden flex' variant='Broken' color="#000" />
                    </div>
                </div>

                <div className=' px-6 sm:px-0 flex sm:flex-row gap-y-4 mt-10 sm:mt-0 sm:gap-y-0 gap-x-5 flex-col justify-start items-start '>
                    <button onClick={() => router.push('/')} className={router.pathname === '/' ? 'sm:text-[#fff] text-[#000] sm:text-lg text-5xl cursor-pointer cubano sm:regular' : 'cubano sm:regular sm:text-lg text-5xl  sm:text-[#949698] text-[#000] cursor-pointer'}>Home</button>
                    <button onClick={() => router.push('/courses')} className={router.pathname === '/courses' ? 'sm:text-[#fff] text-[#000] sm:text-lg text-5xl cursor-pointer cubano sm:regular' : 'cubano sm:regular sm:text-lg text-5xl sm:text-[#949698] text-[#000] cursor-pointer'}>Courses</button>
                    <button onClick={() => router.push('/dashboard')} className={router.pathname === '/dashboard' ? 'sm:text-[#fff] text-[#000] sm:text-lg text-5xl cursor-pointer cubano sm:regular' : 'cubano sm:regular sm:text-lg text-5xl sm:text-[#949698] text-[#000] cursor-pointer'}>Dashboard</button>
                    <button onClick={() => router.push('/about')} className={router.pathname === '/about' ? 'sm:text-[#fff] text-[#000] sm:text-lg text-5xl cursor-pointer cubano sm:regular' : 'cubano sm:regular sm:text-lg text-5xl sm:text-[#949698] text-[#000] cursor-pointer'}>About</button>
                </div>
                <div className=' hidden sm:flex h-4 mx-4 w-[1px] bg-[#dbdbdb84] relative'></div>
                {user ?
                    <User size="25" variant='Broken' color="#fff" /> :
                    <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                        <button className='hidden ml-1 sm:flex text-[#000] px-4 py-2 bg-[#C7FB04] rounded-xl medium cursor-pointer' onClick={signInWithGoogle} >Sign up</button>
                    </motion.div>
                }
                {/* */}
            </div>
        </div>
    );
};

export default Header;
