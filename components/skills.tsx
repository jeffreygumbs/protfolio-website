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
        <div className='flex flex-col gap-6'>
        {groups.map((group) => (
            <div key={group.category}>
                <h3 className='mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/40'>{group.category}</h3>
                <ul className='flex flex-wrap justify-center gap-2 text-lg text-gray-800 dark:text-white/80'>
                    {group.items.map((skill, index) => (
                        <motion.li className='bg-white dark:bg-white/10 borderBlack rounded-xl px-5 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md' key={index} variants={fadeInAnimationVariants} initial="initial" whileInView="animate" viewport={{once: true}} custom={index}>{skill}</motion.li>
                    ))}
                </ul>
            </div>
        ))}
        </div>
    </section>
  )
}
