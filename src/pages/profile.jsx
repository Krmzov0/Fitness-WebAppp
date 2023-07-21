'use client'

import React from 'react';
import Header from '@/components/Header'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'

const Profile = () => {

const router = useRouter();

    const [user, setuser] = useAuthState(auth);

    const handleDeleteAccount = async () => {
        try {
          const user = auth.currentUser;
          await user.delete();
          router.push('/'); // Redirect to home page or any other desired location
        } catch (error) {
          console.log(error);
        }
      };


    return (
        <div className=' h-screen flex flex-col'>
            <Header />

            <div className='relative top-24 sm:px-10 px-5'>
                {user ?
                    <h2 className='text-white regular'>{user.displayName}</h2> :
                    <motion.div onClick={() => router.push('/signup')}  className='w-max text-[#000] px-4 py-2 bg-[#C7FB04] rounded-xl medium cursor-pointer'  whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                        Sign up
                    </motion.div>
                }

               {user ? <h2 className='mt-2 text-[#fff] cursor-pointer' onClick={() => signOut(auth)}>Sign out</h2> : null}
               {user ? <h2 className='mt-2 text-[#fff] cursor-pointer' onClick={handleDeleteAccount}>Delete Account</h2> : null}
            </div>
        </div >
    )
}

export default Profile