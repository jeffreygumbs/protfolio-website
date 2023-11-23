'use client'
import BackBtn from '@/components/back-btn'
import { CardDefault } from '@/components/card'
import SectionHeading from '@/components/section-heading'
import { mobileData } from '@/lib/data'
import { motion } from 'framer-motion'
import React from 'react'

const fadeInAnimationVariants ={
  initial:{
      opacity:0,
      y:100,
  },
  animate:(index: number) => ({
      opacity:1,
      y:0,
      transition:{
          delay:index * 0.05,
          duration:0.5,
      }
      
  })
}

function Mobile() {
  return (
    <div>
    <SectionHeading>Mobile Projects</SectionHeading>
    <div className='flex justify-end mr-36'>
    <BackBtn/>
    </div>
    <div className='flex flex-wrap gap-6 justify-center my-9'>
    {mobileData.map((mobile, index) => (
    <motion.div key={index} variants={fadeInAnimationVariants} initial="initial" whileInView="animate" viewport={{once: true}} custom={index}>
   <CardDefault {...mobile}/>
   </motion.div>
   ))
   }
    </div>
    </div>
  )
}

export default Mobile