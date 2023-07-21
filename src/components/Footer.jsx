import { Facebook, Instagram, Youtube } from 'iconsax-react'
import React from 'react'

const Footer = () => {
  return (
    <div className=' p-8 md:p-28 md:pb-10 pb-10 w-screen h-max relative bottom-0 bg-[#0e0e0e] border-t-2  border-[#ffffff0c]'>
      <div className='flex gap-y-14 md:gap-y-0 flex-col md:flex-row items-start justify-between'>
        <div className='flex flex-col'>
          <h1 className='cubano tracking-wider text-[#fff] text-xl'><span className='text-[#C7FB04] cubano'>KALA</span>FIT</h1>
          <h1 className='cubano text-4xl md:text-4xl mt-5'>Train Like an <span className='text-[#C7FB04] cubano'>Athlete</span> <br /> Look Like a <span className='text-[#C7FB04] cubano'>God</span></h1>
        </div>

        <div>
          <h1 className='cubano tracking-wider text-[#ffffffb5] text-xl'>GET IN TOUCH</h1>
          <h1 className='light text-[#fff] text-3xl md:text-4xl mt-5'>hello@kalafit.com</h1>
          <h1 className='light text-[#fff] text-3xl md:text-4xl mt-5 flex md:hidden '>+389 78 239 880</h1>
          <h1 className='light text-[#fff] text-3xl md:text-4xl mt-2 md:mt-4'>@thekalafit</h1>
        </div>
      </div>

      <div className='w-full h-[1px] bg-[#ffffff19] mt-16 justify-center flex'></div>
      <div className='flex flex-col md:flex-row mt-10 justify-between items-start md:items-center'>
        <div className='flex flex-col md:flex-row gap-y-2 md:gap-y-0  gap-x-8 items-start md:items-center text-lg'>
          <h4 className='light text-xl md:text-lg tracking-wide'>HOME</h4>
          <h4 className='light text-xl md:text-lg tracking-wide'>COURSES</h4>
          <h4 className='light text-xl md:text-lg tracking-wide'>DASHBOARD</h4>
          <h4 className='light text-xl md:text-lg tracking-wide'>PROFILE</h4>
        </div>

        <div className='text-lg mt-10 md:mt-0'>
          <h1 className='light text-xl md:text-lg tracking-wide'>© KALAFIT 2023</h1>
        </div>
      </div>

    </div>
  )
}

export default Footer