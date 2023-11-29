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
import animeFun from "@/public/Anime-Fun.png";

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
      "Check out the Web Projects section! It’s a showcase of fun, creative sites I’ve built in my spare time. Click on any that interest you for more info.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma", "and more"],
    imageUrl: corpcommentImg,
    projectUrl:"/web-projects",
  },
  {
    title: "Mobile Application Development Projects",
    description:
      "Swipe through my collection of fun and creative mobile apps built during my spare time. Tap any project to dive into the details",
    tags: ["React Native", "Swift", "Kotlin", "Flutter"],
    imageUrl: rmtdevImg,
    projectUrl:"/mobile-projects",
  },
  {
    title: "Cyber Security Projects",
    description:
      "Explore the dynamic world of cybersecurity, where I will try and combat evolving threats and defend our digital realm. ",
    tags: ["Mobile Testing", "Web Testing", "Network Testing", "Wifi testing", "and more"],
    imageUrl: wordanalyticsImg,
    projectUrl:"/cybersecurity-projects",
  },
];

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
      "Midjourney inspired this project, and using DALL·E, an OpenAI API was fantastic to play with.",
    tags: ["Vite", "Node.js", "Express", "Tailwind", "MongoDB", "OpenAI API"],
    imageUrl: annAi,
    siteUrl: "https://ann-ai.vercel.app/",
    gitUrl:"https://github.com/jeffreygumbs/AnnAI",
  },
  {
    title: "CodyGPT",
    description:
      "ChatGPT inspired CodyGPT, and it was fun to use OpenAI API.",
    tags: ["Vite", "CSS", "Node.js", "Express", "OpenAI API"],
    imageUrl: codyGpt,
    siteUrl: "https://cody-tau.vercel.app/",
    gitUrl:"https://github.com/jeffreygumbs/cody",
  },
  {
    title: "Anime Fun",
    description:
      "My 12-year-old daughter inspired Anime Fun.",
    tags: ["Next.js", "Framer Motion", "Server Actions"],
    imageUrl: animeFun,
    siteUrl: "https://anime-fun-beta.vercel.app/",
    gitUrl:"https://github.com/jeffreygumbs/anime-fun",
  },
  
  
]as const;
export const mobileData = [
  {
    title: "Airbnb UI Clone",
    description:
      "Airbnb inspired this project, and using React Native and Expo was fantastic tool to work with.",
    tags: ["React Native", "Expo","Clerk",],
    imageUrl: airBnbUi,
    siteUrl: null,
    gitUrl:"https://github.com/jeffreygumbs/Airbnb-ui-Clone",
  },
  {
    title: "War Cards Game",
    description:
      "War Cards Game project, was something I enjoyed working on using Swift UI.",
    tags: ["Swift", "Swift UI",],
    imageUrl: warCards,
    siteUrl: null,
    gitUrl:"https://github.com/jeffreygumbs/War-Card-Game",
  },
  
]as const;
