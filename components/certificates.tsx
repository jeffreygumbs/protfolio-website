"use client"
import React from 'react'
import Image from 'next/image'
import SectionHeading from './section-heading'
import { useSectionInView } from '@/lib/hooks'
import { motion } from 'framer-motion'
import { TbCertificate } from 'react-icons/tb'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'
import type { CertificateItem } from '@/sanity/lib/types'

export default function Certificates({items}: {items: CertificateItem[]}) {
    const {ref} = useSectionInView("Certificates");
  return (
    <section ref={ref} id='certificates' className='mb-28 w-full max-w-[45rem] scroll-mt-28 sm:mb-40'>
        <SectionHeading>Certificates & Diplomas</SectionHeading>
        <ul className='flex flex-col gap-4'>
            {items.map((cert, index) => (
                <motion.li
                    className='flex items-start gap-4 rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-white/5 dark:ring-white/10'
                    key={index}
                    initial={{opacity: 0, y: 60}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.1, duration: 0.4}}
                    viewport={{once: true}}
                >
                    <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xl text-white dark:bg-white/15'>
                        <TbCertificate/>
                    </span>
                    <div className='flex-1'>
                        <h3 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>{cert.title}</h3>
                        <p className='text-sm text-gray-500 dark:text-white/50'>{cert.issuer} · {cert.date}</p>
                        {cert.description && <p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70'>{cert.description}</p>}
                        <div className='mt-3 flex flex-wrap gap-4'>
                            {cert.fileUrl && (
                                <a href={cert.fileUrl} target='_blank' className='inline-flex items-center gap-1 text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600 dark:text-white dark:hover:text-white/70'>
                                    <HiOutlineDocumentText/> View document
                                </a>
                            )}
                            {cert.credentialUrl && (
                                <a href={cert.credentialUrl} target='_blank' className='inline-flex items-center gap-1 text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600 dark:text-white dark:hover:text-white/70'>
                                    Verify credential <BsBoxArrowUpRight/>
                                </a>
                            )}
                        </div>
                    </div>
                    {cert.imageUrl && (
                        <a href={cert.fileUrl ?? (typeof cert.imageUrl === 'string' ? cert.imageUrl : undefined)} target='_blank' className='shrink-0'>
                            <Image
                                src={cert.imageUrl}
                                alt={`${cert.title} document`}
                                width={96}
                                height={96}
                                className='h-24 w-24 rounded-lg object-cover object-top ring-1 ring-black/10 transition hover:opacity-80 dark:ring-white/20'
                            />
                        </a>
                    )}
                </motion.li>
            ))}
        </ul>
    </section>
  )
}
