"use client"
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { BsBoxArrowUpRight, BsX } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { LuCalendarDays } from 'react-icons/lu'
import { TbCertificate } from 'react-icons/tb'
import type { CertificateItem } from '@/sanity/lib/types'

export default function CertificatesGrid({items}: {items: CertificateItem[]}) {
    const [lightbox, setLightbox] = useState<string | null>(null)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

  return (
    <>
        <ul className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {items.map((cert, index) => (
                <motion.li
                    className='group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-white/5 dark:ring-white/10'
                    key={index}
                    initial={{opacity: 0, y: 60}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.06, duration: 0.4}}
                    viewport={{once: true}}
                >
                    {cert.imageUrl ? (
                        <button
                            type='button'
                            onClick={() => typeof cert.imageUrl === 'string' && setLightbox(cert.imageUrl)}
                            className='relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-gray-100 dark:bg-white/5'
                            aria-label={`View ${cert.title}`}
                        >
                            <Image
                                src={cert.imageUrl}
                                alt={cert.title}
                                fill
                                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 22rem, 100vw"
                                className='object-contain p-3 transition-transform duration-500 group-hover:scale-105'
                            />
                        </button>
                    ) : cert.fileUrl ? (
                        <a
                            href={cert.fileUrl}
                            target='_blank'
                            className='relative flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 transition hover:from-gray-200 hover:to-gray-300 dark:from-white/5 dark:to-white/10 dark:hover:from-white/10 dark:hover:to-white/15'
                        >
                            <span className='flex flex-col items-center gap-2 text-gray-400 dark:text-white/40'>
                                <HiOutlineDocumentText className='text-5xl'/>
                                <span className='text-xs font-semibold uppercase tracking-wider'>View PDF</span>
                            </span>
                        </a>
                    ) : (
                        <div className='relative flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10'>
                            <TbCertificate className='text-6xl text-gray-300 dark:text-white/20'/>
                        </div>
                    )}
                    <div className='flex flex-1 flex-col p-5 text-left'>
                        <h3 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>{cert.title}</h3>
                        <p className='mt-1 flex items-center gap-1.5 text-sm text-gray-500 dark:text-white/50'>
                            {cert.issuer}
                            {cert.date && (<><span aria-hidden>·</span><LuCalendarDays className='text-xs'/>{cert.date}</>)}
                        </p>
                        {cert.description && <p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70'>{cert.description}</p>}
                        <div className='mt-auto flex flex-wrap gap-2 pt-4'>
                            {cert.fileUrl && (
                                <a href={cert.fileUrl} target='_blank' className='inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-white/80'>
                                    <HiOutlineDocumentText/> View document
                                </a>
                            )}
                            {cert.credentialUrl && (
                                <a href={cert.credentialUrl} target='_blank' className='inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-700 ring-1 ring-gray-300 transition hover:ring-gray-900 hover:text-gray-900 dark:text-white/80 dark:ring-white/20 dark:hover:ring-white/50 dark:hover:text-white'>
                                    Verify credential <BsBoxArrowUpRight/>
                                </a>
                            )}
                        </div>
                    </div>
                </motion.li>
            ))}
        </ul>

        <AnimatePresence>
            {lightbox && (
                <motion.div
                    className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={() => setLightbox(null)}
                >
                    <motion.div
                        className='relative max-h-[85vh] w-full max-w-4xl'
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.9, opacity: 0}}
                        transition={{type: 'spring', stiffness: 260, damping: 25}}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type='button'
                            onClick={() => setLightbox(null)}
                            aria-label='Close'
                            className='absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition hover:bg-gray-700'
                        >
                            <BsX className='text-xl'/>
                        </button>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={lightbox}
                            alt='Certificate document'
                            className='max-h-[85vh] w-full rounded-xl object-contain'
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  )
}
