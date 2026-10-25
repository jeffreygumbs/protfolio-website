/* eslint-disable react/no-unescaped-entities */
"use client"
import React from 'react'
import SectionHeading from './section-heading';
import {motion} from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';

export default function About() {
  const {ref} = useSectionInView("About");
  return (
    <motion.section 
    ref={ref}
    className='mb-28 max-w-180 text-center leading-8 sm:mb-40 scroll-mt-28'
    initial={{opacity: 0, y: 100}}
    animate={{opacity: 1, y: 0}}
    transition={{delay: 0.175}}
    id='about'
    >
        <SectionHeading>About Me</SectionHeading>
        <p className="mb-3">
        Driven by a passion for programming, I transitioned from{" "}
        <span className="font-medium">nine years in Information Technology</span> to the world of{" "}
        <span className="font-medium">Software Development</span>.{" "}
        After earning my Software & Web Developer diploma from Academy of Learning Career College, I built my skills in{" "}
        <span className="font-medium">full-stack development</span>,{" "}
        particularly with{" "}
        <span className="font-medium">
          React, Next.js, Node.js, and C#/.NET
        </span>
        . I also work as a Learning Coach, mentoring the next cohort of software students. Currently, I'm actively seeking a{" "}
        <span className="font-medium">full-time software engineer position</span>{" "}
        where I can apply my problem-solving skills and enthusiasm for tackling complex challenges.
      </p>

      <p>
        <span className="italic">Beyond coding</span>, I relish spending quality time with my family and immersing myself in captivating films.{" "}
        <span className="font-medium">My love for learning extends beyond programming</span> — I'm currently exploring natural language processing (NLP) and the fascinating realms of artificial intelligence and machine learning. Additionally, I'm actively pursuing proficiency in a new language.
      </p>
        </motion.section>
  )
}
