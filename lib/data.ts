import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduated Bootcamp and Continuous Learning",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
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
    title: "CorpComment",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: corpcommentImg,
  },
  {
    title: "rmtDev",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: rmtdevImg,
  },
  {
    title: "Word Analytics",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "Python",
  "Golang",
  "Rust",
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
