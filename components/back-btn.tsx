"use client"

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useRouter } from 'next/navigation';

export default function BackBtn() {
    const router = useRouter();
    const goBack = () => router.push('/#projects');

  return (
    <button
      onClick={goBack}
      className='group flex h-12 w-32 items-center justify-center gap-2 rounded-full bg-gray-900 font-medium text-white transition-all hover:scale-105 hover:bg-gray-950 focus:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 active:scale-100 dark:bg-white/15 dark:text-white dark:hover:bg-white/25'
    >
      <MdOutlineArrowBackIosNew className="text-xs opacity-70 transition-all group-hover:-translate-x-1" />
      Go Back
    </button>
  );
}
