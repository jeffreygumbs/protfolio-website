

"use client"

import React from 'react'
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useRouter } from 'next/navigation';


export default function BackBtn() {
    const router = useRouter();
    const goBack = () => router.push('/#projects');


  return (
    <>
    <button onClick={goBack} 
      className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
      >
          <>
          <MdOutlineArrowBackIosNew className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:text-lg" />{" "}
          Go Back{" "}
        </>
    </button>
    </>
  );
}
