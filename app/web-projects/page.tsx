
'use client'
import BackBtn from '@/components/back-btn'
import { CardDefault } from '@/components/card'
import SectionHeading from '@/components/section-heading'
import React from 'react'
import {websiteData} from '@/lib/data'
import { motion } from 'framer-motion'

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

function Website() {
  return (
    <div >
    <SectionHeading>Website Projects</SectionHeading>
    <div className='flex justify-end mr-36'>
    <BackBtn/>
    </div>
    <div className='flex flex-wrap gap-6 justify-center my-9'>
   {websiteData.map((website, index) => (
    <motion.div key={index} variants={fadeInAnimationVariants} initial="initial" whileInView="animate" viewport={{once: true}} custom={index}>
        <CardDefault className='w-1/4' {...website}/>
    </motion.div>
   ))
   }
    </div>
    </div>
  )
}

export default Website
