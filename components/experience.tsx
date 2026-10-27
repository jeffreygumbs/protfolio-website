"use client"
import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import type { ExperienceItem } from "@/sanity/lib/types";

const iconMap: Record<string, React.ReactNode> = {
    work: <CgWorkAlt/>,
    code: <FaReact/>,
    graduation: <LuGraduationCap/>,
}

export default function Experience({items}: {items: ExperienceItem[]}) {
    const {ref, inView} = useSectionInView("Experience");
    const { theme} = useTheme();

  return (
    <section ref={ref} id='experience' className="scroll-mt-28 mb-28 sm:mb-40">
        <SectionHeading>My Experience</SectionHeading>
        <VerticalTimeline lineColor="">
                {
                    items.map((item, index) => (
                        <React.Fragment key={index}>
                            <VerticalTimelineElement visible={inView} contentStyle={{
                                background: theme === 'light' ? '#f3f4f6' : "rgba(255, 255, 255, 0.05)",
                                boxShadow: "none",
                                border: "1px solid rgba(0,0,0,0.05)",
                                padding: "1.3rem 2rem",
                                borderRadius: "1rem",
                            }} contentArrowStyle={
                                {borderRight: theme === "light"
                                ? "0.4rem solid #9ca3af"
                                : "0.4rem solid rgba(255, 255, 255, 0.5)",}
                            }
                            date={item.date}
                            icon={typeof item.icon === 'string' ? iconMap[item.icon] ?? iconMap.work : item.icon}
                            iconStyle={{
                                background: theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                                fontSize: "1.5rem",
                            }}
                            >
                                <h3 className="capitalize font-semibold">{item.title}</h3>
                                <p className="font-normal mt-0!">{item.location}</p>
                                <p className="mt-1! font-normal! text-gray-700 dark:text-white/75">{item.description}</p>
                            </VerticalTimelineElement>
                        </React.Fragment>
                    ))
                    }
        </VerticalTimeline>
        </section>
  )
}
