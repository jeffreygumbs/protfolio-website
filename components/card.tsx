'use client'
import Image from "next/image";
import type { ProjectItem } from "@/sanity/lib/types";

type ProjectProps = ProjectItem

export function CardDefault({title, description, tags, imageUrl, siteUrl, gitUrl}:ProjectProps) {
  return (
    <div className="mt-6 flex w-96 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-white/5 dark:ring-white/10">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col px-6 pt-4 pb-6">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="text-gray-600 dark:text-white/70">{description}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">Created With</p>
        <ul className='mt-2 flex flex-wrap gap-2'>
        {tags.map((tag, index) => (
            <li className='rounded-full bg-gray-900/90 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:bg-white/10 dark:text-white/70' key={index}>{tag}</li>
        ))}
        </ul>
        <div className="mt-auto flex gap-2 pt-6">
          {siteUrl !== null && (
            <a href={siteUrl} target="_blank" className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-white/80">Live Site</a>
          )}
          <a href={gitUrl} target="_blank" className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-700 ring-1 ring-gray-300 transition hover:ring-gray-900 hover:text-gray-900 dark:text-white/80 dark:ring-white/20 dark:hover:ring-white/50 dark:hover:text-white">GitHub</a>
        </div>
      </div>
    </div>
  );
}
