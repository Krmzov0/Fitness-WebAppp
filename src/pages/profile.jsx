'use client'
import Header from '@/components/Header'
import React from 'react';
import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { motion } from 'framer-motion';


const profile = () => {

    const [user, setuser] = useAuthState(auth)

    const googleAuth = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleAuth);
    }

    return (
        <div className=' h-screen flex flex-col'>
            <Header />

            <div className='relative top-20 px-5'>
                {user ? (<h2 className='text-[#fff]'>{user.displayName}</h2>) :
                (<motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <button className='sm:flex text-[#000] px-4 py-2 bg-[#C7FB04] rounded-xl medium cursor-pointer' onClick={signInWithGoogle} >Sign up</button>
            </motion.div>)}
            </div>
        </div>
    )
}

export default profile