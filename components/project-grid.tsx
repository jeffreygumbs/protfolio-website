'use client'
import { motion } from 'framer-motion'
import { CardDefault } from './card'
import type { ProjectItem } from '@/sanity/lib/types'

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

export default function ProjectGrid({items}: {items: ProjectItem[]}) {
  return (
    <div className='flex flex-wrap gap-6 justify-center my-9'>
      {items.map((item, index) => (
        <motion.div key={index} variants={fadeInAnimationVariants} initial="initial" whileInView="animate" viewport={{once: true}} custom={index}>
          <CardDefault {...item}/>
        </motion.div>
      ))}
    </div>
  )
}
