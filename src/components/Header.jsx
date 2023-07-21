'use client'

import React, { useState } from 'react';
import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { CloseSquare, HambergerMenu, User } from 'iconsax-react'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Header = () => {

    const [headerScroll, setHeaderScroll] = useState(false);

    useEffect(() => {
        // Function to handle scroll event
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHeaderScroll(true);
            } else {
                setHeaderScroll(false);
            }
        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


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


    const MENU = {
        initial: {
            scaleX: 0,

        },
        animate: {
            scaleX: 1,
            position: 'fixed',
            transformOrigin: 'left',
            zIndex: '50',

            transition: {
                ease: [0.6, 0.01, -0.05, 0.95],
                duration: 0.8
            }
        }
    }

    const navLinks = {
        initial: {
            y: 80,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        }
    }

    return (
            <div className={headerScroll ? 'w-full  fixed top-0 header transition-all duration-150 justify-between items-center px-6 md:px-12 py-6 md:py-6 flex z-[999] gap-x-5 border-none' : 'w-full top-0 border-none absolute bg-[#131313] transition-all duration-150 justify-between items-center px-6 md:px-12 py-6 md:py-8 flex z-[999] gap-x-5' }  >
                <div className='flex justify-between items-center w-full md:w-max'>
                    <div className='cubano text-3xl text-[#fff] cursor-pointer' onClick={() => router.push('/')}><span className='text-[#C7FB04] cubano'>KALA</span>FIT</div>

                    <div className='flex gap-x-4 items-center flex-row-reverse'>
                        <HambergerMenu onClick={handleMenuToggle} className='md:hidden flex' variant='Broken' size="32" color="#fff" />
                        <User onClick={() => router.push('/signup')} size="28" className='md:hidden flex' variant='Broken' color="#fff" />
                    </div>
                </div>

                {toggleMenu && <motion.div variants={MENU} initial='initial' animate='animate' className='h-screen origin-left w-screen md:h-min md:w-max md:hidden fixed md:bg-transparent bg-[#0b0b0b]  flex-col md:flex-row left-0 top-0 items-center'>
                    {toggleMenu && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className='flex md:hidden justify-between items-center w-full md:w-max px-6 py-6'>
                        <div className='cubano text-3xl text-[#fff] cursor-pointer' onClick={() => router.push('/')}><span className='text-[#C7FB04] cubano'>KALA</span>FIT</div>

                        <div className='flex gap-x-5 items-center flex-row-reverse'>
                            <CloseSquare onClick={handleMenuToggle} className='md:hidden flex' variant='Broken' size="32" color="#fff" />
                            <User onClick={() => router.push('/profile')} size="28" className='md:hidden flex' variant='Broken' color="#fff" />
                        </div>
                    </motion.div>)}

                    <div className='px-6 md:px-0 flex md:flex-row gap-y-4 mt-10 md:mt-0 md:gap-y-0 gap-x-5 flex-col justify-start items-start '>
                        {toggleMenu && (<motion.div variants={navLinks} transition={{ delay: 0.4 }}><button onClick={() => router.push('/')} className={router.pathname === '/' ? 'md:text-[#fff] text-[#fff] md:text-lg text-5xl cursor-pointer cubano md:regular' : 'cubano md:regular md:text-lg text-5xl  md:text-[#949698] text-[#fff] cursor-pointer'}>Home</button></motion.div>)}
                        {toggleMenu && (<motion.div variants={navLinks} transition={{ delay: 0.55 }}><button onClick={() => router.push('/courses')} className={router.pathname === '/courses' ? 'md:text-[#fff] text-[#fff] md:text-lg text-5xl cursor-pointer cubano md:regular' : 'cubano md:regular md:text-lg text-5xl md:text-[#949698] text-[#fff] cursor-pointer'}>Courses</button></motion.div>)}
                        {toggleMenu && (<motion.div variants={navLinks} transition={{ delay: 0.65 }}><button onClick={() => router.push('/dashboard')} className={router.pathname === '/dashboard' ? 'md:text-[#fff] text-[#fff] md:text-lg text-5xl cursor-pointer cubano md:regular' : 'cubano md:regular md:text-lg text-5xl md:text-[#949698] text-[#fff] cursor-pointer'}>Dashboard</button></motion.div>)}
                        {toggleMenu && (<motion.div variants={navLinks} transition={{ delay: 0.75 }}><button onClick={() => router.push('/profile')} className={router.pathname === '/profile' ? 'md:text-[#fff] text-[#fff] md:text-lg text-5xl cursor-pointer cubano md:regular' : 'cubano md:regular md:text-lg text-5xl md:text-[#949698] text-[#fff] cursor-pointer'}>Profile</button></motion.div>)}
                        {toggleMenu && (<motion.div variants={navLinks} transition={{ delay: 0.8 }}><button onClick={() => router.push('/signup')} className={router.pathname === '/signup' ? 'md:text-[#fff] text-[#C7FB04] md:text-lg text-5xl cursor-pointer cubano mt-4 md:regular' : 'cubano md:regular md:text-lg text-5xl md:text-[#949698] text-[#C7FB04] mt-4 cursor-pointer'}>Sign up</button></motion.div>)}
                    </div>
                    <div className=' hidden md:flex h-4 mx-4 w-[1px] bg-[#dbdbdb84] relative'></div>
                    {user ?
                        <User size="25" variant='Broken' className='hidden md:flex' color="#fff" /> :
                        <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <button className='hidden ml-1 md:flex text-[#000] px-4 py-2 bg-[#C7FB04] rounded-xl medium cursor-pointer' onClick={signInWithGoogle} >Sign up</button>
                        </motion.div>
                    }
                    {/* */}
                </motion.div>}

                <div className='h-screen origin-left w-screen md:h-min md:w-max hidden md:bg-transparent bg-[#C7FB04]  flex-col md:flex-row left-0 top-0 md:flex items-center'>
                    <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className='flex md:hidden justify-between items-center w-full md:w-max px-6 py-6'>
                        <div className='cubano text-3xl text-[#fff] cursor-pointer' onClick={() => router.push('/')}><span className='text-[#fff] cubano'>KALA</span>FIT</div>

                        <div className='flex gap-x-5 items-center flex-row-reverse'>
                            <CloseSquare onClick={handleMenuToggle} className='md:hidden flex' variant='Broken' size="32" color="#fff" />
                            <User size="28" className='md:hidden flex' variant='Broken' color="#fff" />
                        </div>
                    </div>

                    <div className='px-6 md:px-0 flex md:flex-row gap-y-4 mt-10 md:mt-0 md:gap-y-0 gap-x-5 flex-col justify-start items-start '>
                        <div><button onClick={() => router.push('/')} className={router.pathname === '/' ? 'md:text-[#fff] text-[#fff] md:text-lg text-5xl cursor-pointer cubano md:regular' : 'cubano md:regular md:text-lg text-5xl  md:text-[#949698] text-[#fff] cursor-pointer'}>Home</button></div>
                        <div><button onClick={() => router.push('/courses')} className={router.pathname === '/courses' ? 'md:text-[#fff] text-[#fff] md:text-lg text-5xl cursor-pointer cubano md:regular' : 'cubano md:regular md:text-lg text-5xl md:text-[#949698] text-[#fff] cursor-pointer'}>Courses</button></div>
                        <div><button onClick={() => router.push('/dashboard')} className={router.pathname === '/dashboard' ? 'md:text-[#fff] text-[#fff] md:text-lg text-5xl cursor-pointer cubano md:regular' : 'cubano md:regular md:text-lg text-5xl md:text-[#949698] text-[#fff] cursor-pointer'}>Dashboard</button></div>

                    </div>
                    <div className=' hidden md:flex h-4 mx-4 w-[1px] bg-[#dbdbdb84] relative'></div>
                    {user ?
                        <User onClick={() => router.push('/profile')} className='cursor-pointer' size="25" variant='Broken' color="#fff" /> :
                        <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <button className='hidden ml-1 md:flex text-[#000] px-4 py-2 bg-[#C7FB04] rounded-xl medium cursor-pointer' onClick={() => router.push('/signup')} >Sign up</button>
                        </motion.div>
                    }
                    {/* */}
                </div>
            </div>
    
    );
};

export default Header;
