"use client"
import React from 'react'
import SectionHeading from './section-heading'
import { useSectionInView } from '@/lib/hooks';
import { motion } from 'framer-motion';
import type { SkillGroup } from '@/sanity/lib/types'

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

export default function Skills({groups}: {groups: SkillGroup[]}) {
    const {ref} = useSectionInView("Skills");
  return (
    <section ref={ref} id='skills' className='mb-28 max-w-212 scroll-mt-28 text-center sm:mb-40'>
        <SectionHeading>My Skills</SectionHeading>
        <div className='grid gap-4 text-left sm:grid-cols-2'>
        {groups.map((group) => (
            <motion.div
                key={group.category}
                className='rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md dark:bg-white/5 dark:ring-white/10'
                initial={{opacity: 0, y: 60}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
            >
                <h3 className='mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400'>{group.category}</h3>
                <ul className='flex flex-wrap gap-1.5 text-sm text-gray-800 dark:text-white/80'>
                    {group.items.map((skill, index) => (
                        <motion.li className='rounded-full bg-gray-100 px-3 py-1.5 font-medium ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10' key={index} variants={fadeInAnimationVariants} initial="initial" whileInView="animate" viewport={{once: true}} custom={index}>{skill}</motion.li>
                    ))}
                </ul>
            </motion.div>
        ))}
        </div>
    </section>
  )
}
