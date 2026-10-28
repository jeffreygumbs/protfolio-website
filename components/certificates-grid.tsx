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
    const [viewer, setViewer] = useState<CertificateItem | null>(null)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setViewer(null)
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
                            onClick={() => setViewer(cert)}
                            className='relative aspect-4/3 w-full cursor-zoom-in overflow-hidden bg-gray-100 dark:bg-white/5'
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
                        <button
                            type='button'
                            onClick={() => setViewer(cert)}
                            className='relative flex aspect-4/3 w-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 transition hover:from-gray-200 hover:to-gray-300 dark:from-white/5 dark:to-white/10 dark:hover:from-white/10 dark:hover:to-white/15'
                        >
                            <span className='flex flex-col items-center gap-2 text-gray-400 dark:text-white/40'>
                                <HiOutlineDocumentText className='text-5xl'/>
                                <span className='text-xs font-semibold uppercase tracking-wider'>View PDF</span>
                            </span>
                        </button>
                    ) : (
                        <div className='relative flex aspect-4/3 w-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10'>
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
                                <button type='button' onClick={() => setViewer(cert)} className='inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-white/80'>
                                    <HiOutlineDocumentText/> View document
                                </button>
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
            {viewer && (
                <motion.div
                    className='fixed inset-0 z-9999 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={() => setViewer(null)}
                >
                    <motion.div
                        className='flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900'
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.9, opacity: 0}}
                        transition={{type: 'spring', stiffness: 260, damping: 25}}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-3 dark:border-white/10'>
                            <div className='min-w-0'>
                                <h4 className='truncate text-sm font-semibold text-gray-900 dark:text-white'>{viewer.title}</h4>
                                <p className='truncate text-xs text-gray-500 dark:text-white/50'>{viewer.issuer}</p>
                            </div>
                            <div className='flex shrink-0 items-center gap-2'>
                                {viewer.fileUrl && (
                                    <a href={viewer.fileUrl} target='_blank' className='rounded-full px-3 py-1.5 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-200 transition hover:bg-indigo-50 dark:text-indigo-400 dark:ring-indigo-900 dark:hover:bg-indigo-950'>
                                        Open in new tab <BsBoxArrowUpRight className='inline'/>
                                    </a>
                                )}
                                <button
                                    type='button'
                                    onClick={() => setViewer(null)}
                                    aria-label='Close'
                                    className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20'
                                >
                                    <BsX className='text-xl'/>
                                </button>
                            </div>
                        </div>
                        <div className='min-h-[60vh] flex-1 bg-gray-100 dark:bg-black/40'>
                            {viewer.fileUrl ? (
                                <iframe
                                    src={viewer.fileUrl}
                                    title={viewer.title}
                                    className='h-[75vh] w-full border-0'
                                />
                            ) : typeof viewer.imageUrl === 'string' ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={viewer.imageUrl}
                                    alt={viewer.title}
                                    className='mx-auto max-h-[75vh] object-contain'
                                />
                            ) : null}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  )
}
