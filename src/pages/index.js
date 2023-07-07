'use client'

import Header from '@/components/Header';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import Image from 'next/image';
import { motion } from "framer-motion"
import { useRouter } from 'next/router';

function Home() {

  const router = useRouter();

  const [user, setuser] = useAuthState(auth)

  const handleSignOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    console.log(user);
  }, [user])


  return (
    <div className='flex flex-col text-[#fff]'>
      <motion.div className='absolute w-screen h-[90%] sm:h-screen left-0 top-0 ' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}><Image alt='' src='/bg.jpg' className='absolute w-screen h-screen left-0 top-0 ' width={1000000} height={1000000} /></motion.div>
      <Header />
      <div className='w-full gap-y-6 relative h-screen flex flex-col sm:justify-center justify-start sm:pt-0 pt-24 sm:px-0 px-6 sm:items-center items-start'>
        <div className='z-2 flex flex-col sm:justify-center justify-start sm:items-center items-start sm:gap-y-4'>
          <motion.div className='absolute mt-[24.5rem] sm:mt-36 ml-[-120px] sm:ml-[-60px] rotate-[120deg] sm:rotate-[-130deg] place-self-start' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>
            <Image alt='' src='/img.png' width={250} height={250} />
          </motion.div>
          <h1 className='flex sm:flex-row flex-col text-6xl sm:text-8xl items-start sm:items-center gap-x-0 sm:gap-x-3 z-10  justify-center'>
              <motion.span className='text-start sm:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Train</motion.span>
            <div className='flex items-center gap-x-3 sm:gap-x-5'>
              <motion.span className='text-start sm:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>like</motion.span>
              <motion.span className='text-start sm:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>an</motion.span>
            </div>
            <div className='flex items-center gap-x-3 sm:gap-x-5'>
              <motion.span className='cubano text-[#C7FB04]' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Athlete</motion.span>
            </div>
          </h1>

          <h1 className='flex sm:flex-row flex-col text-6xl sm:text-8xl items-start sm:items-center gap-x-0 sm:gap-x-5 justify-center z-10'>
            <div className='flex items-center gap-x-3 sm:gap-x-5'>
              <motion.span className='text-start sm:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>Look</motion.span>
              <motion.span className='text-start sm:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>like</motion.span>
            </div>
            <div className='flex items-center gap-x-3 sm:gap-x-5'>
              <motion.span className='text-start sm:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>a</motion.span>
              <motion.span className='cubano text-[#C7FB04]' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>God</motion.span>
            </div>
          </h1>
        </div>

        <motion.div onClick={() => router.push('/courses')} whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className='absolute sm:right-8 right-5 sm:bottom-6 bottom-5 cursor-pointer px-10 text-lg py-6 rounded-full bg-[#131313] '>
          <h2>Courses</h2>
        </motion.div>

      </div>

      <div onClick={handleSignOut} className='h-screen bg-[#fff] w-screen relative'>

      </div>
    </div>
  )
}

export default Home


