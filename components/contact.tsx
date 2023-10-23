"use client"
import React from 'react'
import SectionHeading from './section-heading'
import { useSectionInView } from '@/lib/hooks';
import SubmitBtn from '@/components/submit-btn'
import { motion } from 'framer-motion';
import {sendEmail} from "@/actions/sendEmail"
import toast from 'react-hot-toast';



export default function Contact() {
    const {ref} = useSectionInView("Contact");
  return (
    <motion.section ref={ref} id='contact' className='scroll-mt-28 mb-28 sm:mb-28 w-[min(100%, 38rem)]' initial={{ opacity:0}} whileInView={{ opacity:1}} transition={{duration: 1}} viewport={{once: true}}>
        <SectionHeading>Contact Me</SectionHeading>
        <p className='text-gray-700 text-center -mt-6 dark:text-white/80'>Please contact me directly at <a className='underline' href='mailto:jeffreygumbs@gmail.com'>jeffreygumbs@gmail.com</a> or through this form</p>
        <form action={async (formData) => {
          const {data, error} = sendEmail(formData)
          if(error){
            toast.error(error);
            return
          }
          toast.success('Email sent successfully')
          }} className='mt-10 flex flex-col dark:text-black'>
            <input name="senderEmail" className='h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"' type='email' required maxLength={500} placeholder='Your Email'/>
            <textarea name="message" className='h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none' placeholder='Your Message' required maxLength={5000}/>
            <SubmitBtn/>
        </form>
    </motion.section>
  )
}
