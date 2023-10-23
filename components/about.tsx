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
    className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28'
    initial={{opacity: 0, y: 100}}
    animate={{opacity: 1, y: 0}}
    transition={{delay: 0.175}}
    id='about'
    >
        <SectionHeading>About Me</SectionHeading>
        <p className="mb-3">
        Driven by a passion for programming,I transitioned from a career in{" "}
        <span className="font-medium">Computer Networking</span> to the world of{" "} 
        <span className="font-medium">Software Development</span>.{" "}
        Through an immersive online coding bootcamp, I honed my skills in{" "}
        <span className="font-medium">full-stack web development</span>,{" "}
        {/* <span className="italic">My favorite part of programming</span> is the
        problem-solving aspect. I <span className="underline">love</span> the */}
        particularly with{" "}
        <span className="font-medium">
          React, Next.js, Node.js, and MongoDB.
        </span>
        I also possess working knowledge of TypeScript and Prisma, and I'm always eager to expand my technological expertise. Currently, I'm actively seeking a full-time software developer role where I can apply my problem-solving skills and enthusiasm for tackling complex challenges.{" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
      </p>

      <p>
        <span className="italic">Beyond coding</span>, I relish spending quality time with my family and immersing myself in captivating films.{" "}
        <span className="font-medium">My <span className="underline">love</span> for learning extends beyond programming</span>. I am currently
        learning about{" "}
        <span className="font-medium">, as I'm currently exploring the fascinating realms of artificial intelligence and machine learning</span>. Additionally, I'm actively pursuing proficiency in a new language.
      </p>
        </motion.section>
  )
}
