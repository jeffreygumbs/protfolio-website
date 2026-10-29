"use client"
import React from 'react'
import SectionHeading from './section-heading'
import Project from './project'
import { useSectionInView } from '@/lib/hooks'
import type { ProjectCategoryItem } from '@/sanity/lib/types'


export default function Projects({projects}: {projects: ProjectCategoryItem[]}) {
    const {ref} = useSectionInView("Projects", 0.5);
  return (
    <section ref={ref} id='projects' className='scroll-mt-28 mb-28'>
        <SectionHeading>My Projects</SectionHeading>
        <div>
            {
                projects.map((project, index) => (
                    <React.Fragment key={index}>
                    <Project {...project}/>
                    </React.Fragment>
                ))
            }
        </div>
        </section>
  )
}
