"use client"
import React from 'react'
import SectionHeading from './section-heading'
import { useSectionInView } from '@/lib/hooks';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons'
import {
  SiJavascript, SiTypescript, SiPython, SiRust, SiGo, SiHtml5, SiCss,
  SiBootstrap, SiTailwindcss, SiReact, SiAngular, SiRedux, SiNextdotjs,
  SiFramer, SiNodedotjs, SiExpress, SiDeno, SiDotnet, SiFlutter, SiSwift,
  SiMysql, SiPostgresql, SiMongodb, SiPrisma, SiGit, SiDocker,
} from 'react-icons/si'
import { TbBrandCSharp, TbDatabase, TbSql, TbRefresh, TbCode, TbPalette, TbServer, TbDeviceMobile, TbTools } from 'react-icons/tb'
import type { SkillGroup } from '@/sanity/lib/types'

const skillIcons: Record<string, {Icon: IconType; color?: string}> = {
  'C#': {Icon: TbBrandCSharp, color: '#8B5CF6'},
  '.NET': {Icon: SiDotnet, color: '#7B5ED9'},
  'ASP.NET': {Icon: SiDotnet, color: '#7B5ED9'},
  JavaScript: {Icon: SiJavascript, color: '#F7DF1E'},
  TypeScript: {Icon: SiTypescript, color: '#3178C6'},
  Python: {Icon: SiPython, color: '#3776AB'},
  Rust: {Icon: SiRust, color: '#CE422B'},
  GO: {Icon: SiGo, color: '#00ADD8'},
  HTML: {Icon: SiHtml5, color: '#E34F26'},
  CSS: {Icon: SiCss, color: '#1572B6'},
  Bootstrap: {Icon: SiBootstrap, color: '#7952B3'},
  Tailwind: {Icon: SiTailwindcss, color: '#06B6D4'},
  React: {Icon: SiReact, color: '#61DAFB'},
  'React Native': {Icon: SiReact, color: '#61DAFB'},
  Angular: {Icon: SiAngular, color: '#DD0031'},
  Redux: {Icon: SiRedux, color: '#764ABC'},
  'Next.js': {Icon: SiNextdotjs},
  'Framer Motion': {Icon: SiFramer, color: '#EC5990'},
  'Node.js': {Icon: SiNodedotjs, color: '#5FA04E'},
  Express: {Icon: SiExpress},
  Deno: {Icon: SiDeno},
  'SQL Server': {Icon: TbSql, color: '#CC2927'},
  MySQL: {Icon: SiMysql, color: '#4479A1'},
  PostgreSQL: {Icon: SiPostgresql, color: '#4169E1'},
  MongoDB: {Icon: SiMongodb, color: '#47A248'},
  Prisma: {Icon: SiPrisma, color: '#16A394'},
  'Drizzle ORM': {Icon: TbDatabase, color: '#C5F74F'},
  Flutter: {Icon: SiFlutter, color: '#38BDF8'},
  Swift: {Icon: SiSwift, color: '#F05138'},
  Git: {Icon: SiGit, color: '#F05032'},
  Docker: {Icon: SiDocker, color: '#2496ED'},
  Agile: {Icon: TbRefresh, color: '#F59E0B'},
}

const categoryIcons: Record<string, IconType> = {
  Languages: TbCode,
  Frontend: TbPalette,
  Backend: TbServer,
  Mobile: TbDeviceMobile,
  'Databases & ORM': TbDatabase,
  'Tools & DevOps': TbTools,
}

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
        {groups.map((group) => {
            const CategoryIcon = categoryIcons[group.category] ?? TbCode
            return (
            <motion.div
                key={group.category}
                className='rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md dark:bg-white/5 dark:ring-white/10'
                initial={{opacity: 0, y: 60}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
            >
                <h3 className='mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400'>
                    <CategoryIcon className='text-sm'/>{group.category}
                </h3>
                <ul className='flex flex-wrap gap-1.5 text-sm text-gray-800 dark:text-white/80'>
                    {group.items.map((skill, index) => {
                        const meta = skillIcons[skill]
                        const SkillIcon = meta?.Icon
                        return (
                        <motion.li
                            className='flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 font-medium ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-gray-200 dark:bg-white/10 dark:ring-white/10 dark:hover:bg-white/15'
                            key={index}
                            variants={fadeInAnimationVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{once: true}}
                            custom={index}
                        >
                            {SkillIcon && <SkillIcon className='text-base' style={meta?.color ? {color: meta.color} : undefined}/>}
                            {skill}
                        </motion.li>
                    )})}
                </ul>
            </motion.div>
        )})}
        </div>
    </section>
  )
}
