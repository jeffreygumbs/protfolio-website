"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { FaGithub } from 'react-icons/fa'
import type { ProjectItem } from '@/sanity/lib/types'

export default function FeaturedProjects({projects}: {projects: ProjectItem[]}) {
    if (!projects.length) return null
  return (
    <div className='mb-20'>
        <h3 className='mb-6 text-center text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-white/40'>Featured Projects</h3>
        <ul className='grid gap-5 sm:grid-cols-3'>
            {projects.map((project, index) => (
                <motion.li
                    key={index}
                    className='group flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-white/5 dark:ring-white/10'
                    initial={{opacity: 0, y: 60}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.08, duration: 0.4}}
                    viewport={{once: true}}
                >
                    <h4 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>{project.title}</h4>
                    {project.description && <p className='mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-white/60 line-clamp-3'>{project.description}</p>}
                    <ul className='mt-3 flex flex-wrap gap-1.5'>
                        {project.tags.slice(0, 3).map((tag, i) => (
                            <li className='rounded-full bg-gray-900 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white dark:text-white/70 dark:bg-white/15' key={i}>{tag}</li>
                        ))}
                    </ul>
                    <div className='mt-4 flex gap-2'>
                        {project.siteUrl && (
                            <a href={project.siteUrl} target='_blank' className='inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gray-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-700 dark:bg-white/15 dark:hover:bg-white/25'>
                                Live <BsBoxArrowUpRight/>
                            </a>
                        )}
                        {project.gitUrl && (
                            <a href={project.gitUrl} target='_blank' aria-label={`${project.title} source code`} className='inline-flex items-center justify-center rounded-full px-3 py-2 text-gray-700 ring-1 ring-gray-300 transition hover:text-gray-950 hover:ring-gray-900 dark:text-white/80 dark:ring-white/20 dark:hover:ring-white/50'>
                                <FaGithub className='text-base'/>
                            </a>
                        )}
                    </div>
                </motion.li>
            ))}
        </ul>
    </div>
  )
}
