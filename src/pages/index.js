'use client'

import Header from '@/components/Header';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react';
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAuthState } from 'react-firebase-hooks/auth'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowDown, ArrowSquareRight } from 'iconsax-react';
import AnimatedText from '@/components/AnimatedText';
import Footer from '@/components/Footer';


function Home() {

  const router = useRouter();

  const [user, setuser] = useAuthState(auth)

  const handleSignOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    console.log(user);
  }, [user])

  const [ref, inView] = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);


  const coursesCards = {
    visible: { opacity: 1, transition: { duration: 0.4, delay: 0.5 } },
    hidden: { opacity: 0 },
  }

  const coursesParagraph = {
    visible: { opacity: 1, y: 0, transition: { delay: 0.8 } },
    hidden: { opacity: 0, y: 30},
  }

  const coursesParagraph2 = {
    visible: { opacity: 1, y: 0, transition: { delay: 0.95 } },
    hidden: { opacity: 0, y: 30 },
  }

  return (
    <div className='flex flex-col text-[#fff]'>
      <motion.div className='absolute w-screen h-[90%] md:h-screen left-0 top-0 ' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}><Image alt='' src='/bg.jpg' className='absolute w-screen h-screen left-0 top-0 ' width={1000000} height={1000000} /></motion.div>
      <Header />
      <div className='w-full gap-y-6 relative h-screen flex flex-col md:justify-center justify-start md:pt-0 pt-24 md:px-0 px-6 md:items-center items-start'>
        <div className='z-2 flex flex-col md:justify-center justify-start md:items-center items-start md:gap-y-4'>
          <motion.div className='absolute mt-[24.5rem] md:mt-36 ml-[-120px] md:ml-[-60px] rotate-[120deg] md:rotate-[-130deg] place-self-start' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>
            <Image alt='' src='/img.png' width={250} height={250} />
          </motion.div>
          <h1 className='flex md:flex-row flex-col text-6xl md:text-8xl items-start md:items-center gap-x-0 md:gap-x-5 z-10  justify-center'>
            <motion.span className='text-start md:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Train</motion.span>
            <div className='flex items-center gap-x-3 md:gap-x-5'>
              <motion.span className='text-start md:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>like</motion.span>
              <motion.span className='text-start md:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>an</motion.span>
            </div>
            <div className='flex items-center gap-x-3 md:gap-x-5'>
              <motion.span className='cubano text-[#C7FB04]' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Athlete</motion.span>
            </div>
          </h1>

          <h1 className='flex md:flex-row flex-col text-6xl md:text-8xl items-start md:items-center gap-x-0 md:gap-x-5 justify-center z-10'>
            <div className='flex items-center gap-x-3 md:gap-x-5'>
              <motion.span className='text-start md:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>Look</motion.span>
              <motion.span className='text-start md:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>like</motion.span>
            </div>
            <div className='flex items-center gap-x-3 md:gap-x-5'>
              <motion.span className='text-start md:text-center cubano' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>a</motion.span>
              <motion.span className='cubano text-[#C7FB04]' initial={{ opacity: 0, y: 140 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>God</motion.span>
            </div>
          </h1>
        </div>

        <motion.div onClick={() => router.push('/courses')} whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className='absolute md:right-8 right-5 md:bottom-6 bottom-5 cursor-pointer px-10 text-lg py-6 rounded-full bg-[#131313] '>
          <h2>Courses</h2>
        </motion.div>

      </div>

      <div className='w-screen h-screen md:pb-[120px] pl-[20px] pr-[20px] md:px-[100px] pt-[80px] md:pt-[120px] pb-[80px] bg-[#fff] relative'>
        <div className='w-max flex mb-12 z-2 gap-x-2'>
          <div className='p-2 flex justify-center items-center border-2 border-[#000] rounded-2xl bg-none w-12 h-12 md:w-full md:h-full'><ArrowDown size={36} color="#000" variant='Broken' /></div>
          <div className='p-2 px-4 md:p-3 flex justify-center w-full items-center md:px-6 border-2 border-[#000] rounded-2xl bg-none text-lg md:text-xl kayak-bold text-[#000] medium'>TEAM</div>
        </div>
      </div>


      <div className='w-screen h-max md:pb-[120px] pl-[20px] pr-[20px] md:px-[100px] pt-[80px] md:pt-[120px] pb-[80px] bg-[#131313] relative'>
        <div className='w-max flex mb-12 z-2 gap-x-2'>
          <div className='p-2 flex justify-center items-center border-2 border-[#fff] rounded-2xl bg-none w-12 h-12 md:w-full md:h-full'><ArrowDown size={36} color="#fff" variant='Broken' /></div>
          <div className='p-2 px-4 md:p-3 flex justify-center items-center md:px-6 border-2 border-[#fff] rounded-2xl bg-none text-lg md:text-xl kayak-bold text-[#fff] medium'>COURSES</div>
        </div>

        <div className='flex md:flex-row flex-col justify-between items-start md:items-center'>

          <div>
            <AnimatedText text="Unleash" your="Your" potential="Potential" inView={inView} />
          </div>

          <div className='flex mt-7 md:mt-0 md:flex-row flex-col w-full md:w-[50%] items-center gap-x-0 md:gap-x-4 h-full'>
            <motion.div ref={ref}
              animate={controls}
              initial="hidden"
              variants={coursesCards} onClick={() => router.push('/courses/muscle-gain')} className='overflow-hidden relative h-[16rem] w-full md:w-full p-6 rounded-3xl bg-[#0e0e0e] border-2 hover:border-[#f7f7f7de] transition-all cursor-pointer hover:mb-3 border-[#ffffff0c]'>
              <h5 className='text-[#ffffffb7] text-md regular'>Course</h5>
              <h2 className='text-3xl cubano'>Muscle Gain </h2>
              <p className='mt-2 regular text-lg text-[#ffffffe2]'>Gain Muscle with a specific <br /> workout and diet plan</p>
              <ArrowSquareRight className='absolute bottom-6' size="32" color="#fff" />
              <Image alt='' className='absolute right-[-6rem] md:right-[-4rem] bottom-[-2rem] rotate-[-45deg]' src='/img.png' width={220} height={220} />
            </motion.div>

            <motion.div ref={ref}
              animate={controls}
              initial="hidden"
              variants={coursesCards} onClick={() => router.push('/courses')} className='h-20 md:h-64 w-full relative overflow-hidden mt-4 md:mt-0 md:w-[50%] p-6 rounded-3xl bg-[#0f0f0f] border-2 hover:border-[#f7f7f7de] transition-all cursor-pointer hover:mb-3 border-[#ffffff0c]'>
              <div className='flex w-full justify-between items-center'>
                <h2 className='medium text-xl'>See all </h2>
                <Image alt='' className='hidden md:flex absolute bottom-[-5rem] left-[50%] translate-x-[-50%] rotate-[-45deg]' src='/img2.png' width={220} height={220} />
                <ArrowSquareRight size="32" color="#fff" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className='relative mt-7 md:mt-14 flex flex-col'>
          <div className='flex w-full place-self-start md:place-self-end md:w-[50%] flex-col '>
            <div className='w-full flex flex-col md:flex-row items-start gap-x-0 md:gap-x-6 gap-y-6 md:gap-y-0 '>
              <motion.div className='regular text-xl' ref={ref}
                animate={controls}
                initial="hidden"
                variants={coursesParagraph} >
                Achieve Your Fitness Goals with Expertly Curated Courses. From fat burning to strength building.
              </motion.div>

              <motion.div className='regular text-xl' ref={ref}
                animate={controls}
                initial="hidden"
                variants={coursesParagraph2} >
                Our diverse programs cater to all fitness levels. Push your limits, surpass your goals, and thrive in our supportive environment.
              </motion.div>
            </div>
            <button className='px-6 py-3 w-max rounded-2xl mt-6 text-lg medium bg-[#fff] text-black'>See Courses</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home


