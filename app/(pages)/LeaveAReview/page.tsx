import React from 'react'
import Image from "next/image";
import { Button, TextInput } from 'flowbite-react';

const LeaveAReview = () => {
  return (
    <div className='bg-[#2D2D2D] min-h-screen pb-20'>
        <div className=''>
            <Image src="/assets/MunchrLogo.png" className="mx-auto pt-5" width={70} height={70} alt={"Munchr Logo"}></Image>
            <h3 className='text-[#C95A23] flex justify-center text-[30px] font-extrabold'>Munchr</h3>
        </div>
        <div className='bg-[#484848] min-h-screen mt-10 mx-10 rounded-[20px] p-20'>
          <div className='flex gap-10'>
            <div className=''>
              <Image src="/assets/mexican-food-stock-image.jpg" className="rounded-[20px]" width={200} height={200} alt={"Munchr Logo"}></Image>
            </div>
            <div className='my-auto'>
              <h3 className='text-[72px] font-bold'>La Kora Taco Truck</h3>
              <h5 className='text-[40px] opacity-50'>Stockton, CA</h5>
            </div>
          </div>
          <div className='mt-10'>
            <h3 className='text-[60px] font-bold'>How would you rate the business?</h3>
            <div>
              <div className='flex'>
                <Image src="/assets/rating-icon-colored-outline.png" className="" width={80} height={85} alt={"Munchr Logo"}></Image>
                <Image src="/assets/rating-icon-colored-outline.png" className="" width={80} height={85} alt={"Munchr Logo"}></Image>
                <Image src="/assets/rating-icon-colored-outline.png" className="" width={80} height={85} alt={"Munchr Logo"}></Image>
                <Image src="/assets/rating-icon-colored-outline.png" className="" width={80} height={85} alt={"Munchr Logo"}></Image>
                <Image src="/assets/rating-icon-colored-outline.png" className="" width={80} height={85} alt={"Munchr Logo"}></Image>
                <p className='opacity-50 my-auto ms-5'>Select your rating</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className='text-[60px] font-bold mt-10'>How was your experience?</h3>
            <input type="text" placeholder='Start your review...' className='bg-[#D9D9D9] text-black w-full ps-5 h-[700px] rounded-[20px]' />
          </div>
          <div>
            <Button color={"#C95A23"} className='bg-[#C95A23] h-[80px] w-[300px] mt-5 text-[30px] font-bold'>Post Review</Button>
          </div>
        </div>
    </div>
  )
}

export default LeaveAReview