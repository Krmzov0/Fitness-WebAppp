'use client'

import React from 'react';
import Header from '@/components/Header'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'
import { LoginCurve, LogoutCurve, Trash, UserAdd } from 'iconsax-react';

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

      <div className='relative top-24 md:top-32 md:px-12 px-5'>
        {user ?
          <div>
            <div className='flex w-full justify-between items-start'>
              <h1 className='cubano text-4xl text-[#fff] '>Profile</h1>
              <motion.div className=' text-[#fff] cursor-pointer w-full sm:w-56 items-center gap-x-3 text-lg py-3 px-4 hidden md:flex justify-center rounded-xl border border-[#ffffff15] hover:border-[#ffffff9f]' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <Trash size="24" color="#C7FB04" variant="Broken" />
                <h2 onClick={handleDeleteAccount}>Delete Account</h2>
              </motion.div>
            </div>

            <div className='mt-4 gap-y-1 flex flex-col'>
              <h2 className='text-white text-xl regular'>{user.displayName}</h2>
              <h2 className='text-white text-xl regular'>{user.email}</h2>
            </div>

            <div className='mt-5 flex md:hidden flex-col items-start  gap-y-4  gap-x-4'>
              <motion.div className=' text-[#fff] cursor-pointer w-full sm:w-56 items-center gap-x-3 text-lg py-3 px-4 flex justify-center rounded-xl border border-[#ffffff15] hover:border-[#ffffff9f]' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <LogoutCurve size="24" color="#C7FB04" variant="Broken" />
                <h2 onClick={() => signOut(auth)}>Sign Out</h2>
              </motion.div>

              <motion.div className=' text-[#fff] cursor-pointer w-full sm:w-56 items-center gap-x-3 text-lg py-3 px-4 flex justify-center rounded-xl border border-[#ffffff15] hover:border-[#ffffff9f]' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <Trash size="24" color="#C7FB04" variant="Broken" />
                <h2 onClick={handleDeleteAccount}>Delete Account</h2>
              </motion.div>
            </div>

            <motion.div className=' text-[#fff] mt-4 hidden cursor-pointer w-full sm:w-56 items-center gap-x-3 text-lg py-3 px-4 md:flex justify-center rounded-xl border border-[#ffffff15] hover:border-[#ffffff9f]' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <LogoutCurve size="24" color="#C7FB04" variant="Broken" />
              <h2 onClick={() => signOut(auth)}>Sign out</h2>
            </motion.div>
          </div>
          :
          <div>
            <h1 className='cubano text-4xl text-white'>Profile</h1>
            <h4 className='mt-2 text-[#ffffffbb] text-lg'>Create your account or Sign In into your existing</h4>

            <div className='mt-4 flex flex-col items-start  gap-y-4  gap-x-4'>
              <motion.div onClick={() => router.push('/signup')} className=' text-[#fff] cursor-pointer w-full sm:w-56 items-center gap-x-3 text-lg py-3 px-4 flex justify-center rounded-xl border border-[#ffffff15] hover:border-[#ffffff9f]' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <UserAdd size="24" color="#C7FB04" variant="Broken" />
                <h2 onClick={handleDeleteAccount}>Create Account</h2>
              </motion.div>

              <motion.div onClick={() => router.push('/signin')} className=' text-[#fff] cursor-pointer w-full sm:w-56 items-center gap-x-3 text-lg py-3 px-4 flex justify-center rounded-xl border border-[#ffffff15] hover:border-[#ffffff9f]' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <LoginCurve size="24" color="#C7FB04" variant="Broken" />
                <h2 onClick={handleDeleteAccount}>Sign In</h2>
              </motion.div>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default Profile


// {user ?
//   <h2 className='text-white regular'>{user.displayName}</h2> :
//   <motion.div onClick={() => router.push('/signup')}  className='w-max text-[#000] px-4 py-2 bg-[#C7FB04] rounded-xl medium cursor-pointer'  whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
//       Sign up
//   </motion.div>
// }