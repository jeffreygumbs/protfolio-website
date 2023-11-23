import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import annAi from "@/public/AnnAI.png";
import codyGpt from "@/public/CodyGPT.png";
import rmtdevImg from "@/public/rmtdev.png";
import airBnbUi from "@/public/Airbnb-ui.png";
import warCards from "@/public/war-card.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "/#home",
  },
  {
    name: "About",
    hash: "/#about",
  },
  {
    name: "Projects",
    hash: "/#projects",
  },
  {
    name: "Skills",
    hash: "/#skills",
  },
  {
    name: "Experience",
    hash: "/#experience",
  },
  {
    name: "Contact",
    hash: "/#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Successful Bootcamp Graduate Committed to Continuous Learning",
    location: "Miami, FL",
    description:
      "After an intensive 6-month bootcamp program, I proudly earned my Full Stack developer certification. Leveraging my newfound skills, I swiftly secured a position in the field, demonstrating my dedication to continuous growth and excellence.",
    icon: React.createElement(LuGraduationCap),
    date: "2006 - present",
  },
  {
    title: "Information Technology",
    location: "Edmonton, AB",
    description:
      "I worked as an Information Technology Specialist for 8 years at a landscape company, managing a network of over 12 servers and computers, including Windows and Linux servers, workstations, and laptops. I also managed the company's website and web applications and implemented and tested cybersecurity measures to protect the company's data and systems. My work helped to improve the company's efficiency, security, and customer service.",
    icon: React.createElement(CgWorkAlt),
    date: "2014 - 2023",
  },
  {
    title: "Full-Stack Developer",
    location: "Edmonton, AB",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2020 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Web Application Development Projects",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma", "and more"],
    imageUrl: corpcommentImg,
    projectUrl:"/web-projects"
  },
  {
    title: "Mobile Application Development Projects",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React Native", "Swift", "Kotlin", "Flutter"],
    imageUrl: rmtdevImg,
    projectUrl:"/mobile-projects"
  },
  {
    title: "Cyber Security Projects",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["Mobile Testing", "Web Testing", "Network Testing", "Wifi testing", "and more"],
    imageUrl: wordanalyticsImg,
    projectUrl:"/cybersecurity-projects"
  },
] as const;

export const skillsData = [
  "Python",
  "Golang",
  "Rust",
  "PHP",
  "Bash Script", 
  "HTML",
  "CSS",
  "SASS",
  "JavaScript",
  "TypeScript",
  "Angular",
  "Vue",
  "React",
  "Redux",
  "Deno",
  "Node.js",
  "Express",
  "Next.js",
  "Git",
  "Tailwind",
  "Prisma",
  "Drizzle",
  "MongoDB",
  "GraphQL",
  "Apollo",
  "PostgreSQL",
  "Django",
  "Framer Motion",
  "Docker",
  "Swift",
  "Java",
  "Kotlin",
  "React Native",
  "Flutter",
] as const;

export const websiteData = [
  {
    title: "AnnAI",
    description:
      "CorpComment is a web application that allows users to give public feedback to companies.",
    tags: ["Vite", "Node.js", "Express", "Tailwind", "MongoDB", "OpenAI API"],
    imageUrl: annAi,
    siteUrl: "https://ann-ai.vercel.app/",
    gitUrl:"https://github.com/jeffreygumbs/AnnAI",
  },
  {
    title: "CodyGPT",
    description:
      "CorpComment is a web application that allows users to give public feedback to companies.",
    tags: ["Vite", "CSS", "Node.js", "Express", "OpenAI API"],
    imageUrl: codyGpt,
    siteUrl: "https://cody-tau.vercel.app/",
    gitUrl:"https://github.com/jeffreygumbs/cody",
  },
  
] as const;
export const mobileData = [
  {
    title: "Airbnb UI Clone",
    description:
      "CorpComment is a web application that allows users to give public feedback to companies.",
    tags: ["React Native", "Expo","Clerk",],
    imageUrl: airBnbUi,
    siteUrl: "https://ann-ai.vercel.app/",
    gitUrl:"https://github.com/jeffreygumbs/AnnAI",
  },
  {
    title: "War Cards Game",
    description:
      "CorpComment is a web application that allows users to give public feedback to companies.",
    tags: ["Swift", "Swift UI",],
    imageUrl: warCards,
    siteUrl: "https://cody-tau.vercel.app/",
    gitUrl:"https://github.com/jeffreygumbs/cody",
  },
  
] as const;
