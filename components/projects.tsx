"use client"
import React from 'react'
import SectionHeading from './section-heading'
import Project from './project'
import FeaturedProjects from './featured-projects'
import { useSectionInView } from '@/lib/hooks'
import type { ProjectCategoryItem, ProjectItem } from '@/sanity/lib/types'


export default function Projects({projects, featured}: {projects: ProjectCategoryItem[], featured: ProjectItem[]}) {
    const {ref} = useSectionInView("Projects", 0.5);
  return (
    <section ref={ref} id='projects' className='scroll-mt-28 mb-28'>
        <SectionHeading>My Projects</SectionHeading>
        <FeaturedProjects projects={featured}/>
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
