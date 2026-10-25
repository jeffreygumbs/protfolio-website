import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import webProjectsImg from "@/public/web-projects.png";
import annAi from "@/public/AnnAI.png";
import codyGpt from "@/public/CodyGPT.png";
import rmtdevImg from "@/public/rmtdev.png";
import airBnbUi from "@/public/Airbnb-ui.png";
import warCards from "@/public/war-card.png";
import animeFun from "@/public/Anime-Fun.png";
import annChat from "@/public/AnnChat.png";
import teachMe from "@/public/teachme.png";

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
    title: "Software Engineer (Self-Employed)",
    location: "Edmonton, AB",
    description:
      "I lead full-lifecycle development of web and mobile applications for clients — from requirements gathering and design through deployment and maintenance — using React, Node.js, React Native, and Flutter.",
    icon: React.createElement(FaReact),
    date: "2023 - present",
  },
  {
    title: "Learning Coach",
    location: "Edmonton, AB",
    description:
      "At Academy of Learning Career College, I guide software and web development students through coursework — providing technical instruction, debugging assistance, and project feedback on programming concepts, databases, and web technologies.",
    icon: React.createElement(CgWorkAlt),
    date: "2025 - 2026",
  },
  {
    title: "Software & Web Developer Diploma",
    location: "Edmonton, AB",
    description:
      "Graduated from Academy of Learning Career College, with coursework covering C#, .NET Framework, JavaScript, SQL, HTML/CSS, version control, and project management.",
    icon: React.createElement(LuGraduationCap),
    date: "2024 - 2025",
  },
  {
    title: "Information Technology Specialist",
    location: "Edmonton, AB",
    description:
      "Nine years at Classic Landscapes providing technical support and systems administration — managing servers and workstations, leading IT projects like system upgrades, and maintaining the server room environment.",
    icon: React.createElement(CgWorkAlt),
    date: "2014 - 2023",
  },
] as const;

export const projectsData = [
  {
    title: "Web Application Development Projects",
    description:
      "A showcase of web apps I've built — click through for live demos and source code.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma", "and more"],
    imageUrl: webProjectsImg,
    projectUrl:"/web-projects",
  },
  {
    title: "Mobile Application Development Projects",
    description:
      "A collection of cross-platform mobile apps I've built — tap any project for details and source code.",
    tags: ["React Native", "Swift", "Kotlin", "Flutter"],
    imageUrl: rmtdevImg,
    projectUrl:"/mobile-projects",
  },
];

export const skillsData = [
  "C#",
  ".NET",
  "ASP.NET",
  "Rust",
  "GO",
  "JavaScript",
  "TypeScript",
  "Python",
  "HTML",
  "CSS",
  "Bootstrap",
  "Tailwind",
  "React",
  "Angular",
  "Redux",
  "Next.js",
  "Node.js",
  "Express",
  "Deno",
  "SQL Server",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Drizzle ORM",
  "React Native",
  "Flutter",
  "Swift",
  "Framer Motion",
  "Git",
  "Docker",
  "Agile",
] as const;

export const websiteData = [
  {
    title: "AnnAI",
    description:
      "An AI image generation app powered by Gemini API — a Midjourney-style tool with a custom interface.",
    tags: ["Vite", "Node.js", "Express", "Tailwind", "MongoDB", "Gemini API"],
    imageUrl: annAi,
    siteUrl: "https://annai.jeffreygumbs.com/",
    gitUrl:"https://github.com/jeffreygumbs/AnnAI",
  },
  {
    title: "CodyGPT",
    description:
      "A ChatGPT-style AI chat application built on the Gemini API with a Node.js/Express backend.",
    tags: ["Vite", "CSS", "Node.js", "Express", "Gemini API"],
    imageUrl: codyGpt,
    siteUrl: "https://cody.jeffreygumbs.com/",
    gitUrl:"https://github.com/jeffreygumbs/cody",
  },
  {
    title: "Anime Fun",
    description:
      "An anime app built with Next.js, Framer Motion, and Server Actions — inspired by my daughter.",
    tags: ["Next.js", "Framer Motion", "Server Actions"],
    imageUrl: animeFun,
    siteUrl: "https://animefun.jeffreygumbs.com/",
    gitUrl:"https://github.com/jeffreygumbs/anime-fun",
  },
  {
    title: "Teach Me", 
    description:
      "A technical assessment for Inspired Instruction — a full-stack app with auth, database, and transactional email.",
    tags: ["Next.js", "Server Actions", "Prisma", "Tailwind", "Shadcn UI","Supabase", "Authjs", "zod", "resend"],
    imageUrl: teachMe,
    siteUrl: "teachme.jeffreygumbs.com",
    gitUrl:"https://github.com/jeffreygumbs/teachme",
  },
  
  
]as const;
export const mobileData = [
  {
    title: "Airbnb UI Clone",
    description:
      "A faithful recreation of the Airbnb mobile UI, built with React Native, Expo, and Clerk auth.",
    tags: ["React Native", "Expo","Clerk",],
    imageUrl: airBnbUi,
    siteUrl: null,
    gitUrl:"https://github.com/jeffreygumbs/Airbnb-ui-Clone",
  },
  {
    title: "War Cards Game",
    description:
      "The classic War card game, built natively for iOS with SwiftUI.",
    tags: ["Swift", "Swift UI",],
    imageUrl: warCards,
    siteUrl: null,
    gitUrl:"https://github.com/jeffreygumbs/War-Card-Game",
  },
  {
    title: "Ann Chat",
    description:
      "A full-stack video and chat app built with React Native, Expo, Node.js, and Supabase.",
    tags: ["React Native", "Expo","Node.js","Supabase"],
    imageUrl: annChat,
    siteUrl: null,
    gitUrl:"https://github.com/jeffreygumbs/annChat",
  },
  
]as const;
