"use client"
import React, {useMemo, useState} from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { HiOutlineBadgeCheck, HiOutlineDocumentText, HiOutlineSearch, HiOutlineStar, HiOutlineX } from 'react-icons/hi'
import { LuCalendarDays } from 'react-icons/lu'
import { TbCertificate } from 'react-icons/tb'
import DocViewer from './doc-viewer'
import type { CertificateItem } from '@/sanity/lib/types'

const PAGE_SIZE = 6

const ISSUER_COLORS: Record<string, string> = {
    'Coursera': '#0056D2',
    'Udemy': '#A435F0',
    'Zero to Mastery Academy': '#18181b',
    'Ec-Council': '#E53935',
    'Academy of Learning Career College': '#0EA5E9',
}

const issuerColor = (issuer?: string) => (issuer && ISSUER_COLORS[issuer]) || '#6366f1'

export default function CertificatesGrid({items, showControls = false}: {items: CertificateItem[], showControls?: boolean}) {
    const [viewer, setViewer] = useState<CertificateItem | null>(null)
    const [query, setQuery] = useState('')
    const [issuer, setIssuer] = useState<string | null>(null)
    const [expanded, setExpanded] = useState(false)

    const issuers = useMemo(
        () => Array.from(new Set(items.map(c => c.issuer).filter((i): i is string => !!i))).sort(),
        [items]
    )

    const filtering = query.trim() !== '' || issuer !== null

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return items.filter(c =>
            (!issuer || c.issuer === issuer) &&
            (!q || [c.title, c.issuer, c.date, c.description].some(f => f?.toLowerCase().includes(q)))
        )
    }, [items, query, issuer])

    const visible = !showControls || expanded || filtering ? filtered : filtered.slice(0, PAGE_SIZE)
    const hiddenCount = filtered.length - visible.length

  return (
    <>
        {showControls && (
        <div className='mb-6 flex flex-col gap-3'>
            <div className='relative'>
                <HiOutlineSearch className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400'/>
                <input
                    type='search'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder='Search certificates by title, issuer, or year...'
                    aria-label='Search certificates'
                    className='w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-11 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40'
                />
                {query && (
                    <button
                        type='button'
                        onClick={() => setQuery('')}
                        aria-label='Clear search'
                        className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white'
                    >
                        <HiOutlineX/>
                    </button>
                )}
            </div>
            <div className='flex flex-wrap items-center gap-2'>
                <button
                    type='button'
                    onClick={() => setIssuer(null)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${issuer === null ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-white text-gray-600 ring-1 ring-black/10 hover:ring-black/30 dark:bg-white/5 dark:text-white/70 dark:ring-white/15 dark:hover:ring-white/40'}`}
                >
                    All
                </button>
                {issuers.map(i => (
                    <button
                        key={i}
                        type='button'
                        onClick={() => setIssuer(issuer === i ? null : i)}
                        aria-pressed={issuer === i}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${issuer === i ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-white text-gray-600 ring-1 ring-black/10 hover:ring-black/30 dark:bg-white/5 dark:text-white/70 dark:ring-white/15 dark:hover:ring-white/40'}`}
                    >
                        <span className='h-2 w-2 rounded-full' style={{backgroundColor: issuerColor(i)}}/>
                        {i}
                    </button>
                ))}
                <span className='ml-auto text-xs text-gray-400 dark:text-white/40'>
                    Showing {visible.length} of {items.length}
                </span>
            </div>
        </div>
        )}

        {filtered.length === 0 ? (
            <div className='flex flex-col items-center gap-2 rounded-2xl border border-dashed border-gray-300 py-14 text-center dark:border-white/15'>
                <TbCertificate className='text-4xl text-gray-300 dark:text-white/25'/>
                <p className='text-sm font-medium text-gray-500 dark:text-white/50'>No certificates match &ldquo;{query}&rdquo;</p>
                <button
                    type='button'
                    onClick={() => {setQuery(''); setIssuer(null)}}
                    className='text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400'
                >
                    Clear filters
                </button>
            </div>
        ) : (
        <ul className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            <AnimatePresence mode='popLayout'>
            {visible.map((cert, index) => (
                <motion.li
                    layout
                    className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-white/5 ${cert.featured ? 'ring-2 ring-indigo-500/60 dark:ring-indigo-400/50' : 'ring-1 ring-black/5 dark:ring-white/10'}`}
                    key={cert.title}
                    initial={{opacity: 0, y: 60}}
                    whileInView={{opacity: 1, y: 0}}
                    exit={{opacity: 0, scale: 0.95}}
                    transition={{delay: (index % PAGE_SIZE) * 0.05, duration: 0.35}}
                    viewport={{once: true}}
                >
                    {cert.featured && (
                        <span className='absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md'>
                            <HiOutlineStar/> Featured
                        </span>
                    )}
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
                            <span className='h-2 w-2 shrink-0 rounded-full' style={{backgroundColor: issuerColor(cert.issuer)}}/>
                            {cert.issuer}
                            {cert.date && (<><span aria-hidden>·</span><LuCalendarDays className='text-xs'/>{cert.date}</>)}
                            {cert.credentialUrl && (
                                <span className='ml-auto inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400'>
                                    <HiOutlineBadgeCheck className='text-sm'/> Verified
                                </span>
                            )}
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
            </AnimatePresence>
        </ul>
        )}

        {hiddenCount > 0 && (
            <div className='mt-8 flex justify-center'>
                <button
                    type='button'
                    onClick={() => setExpanded(true)}
                    className='rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-white/80'
                >
                    Show {hiddenCount} more
                </button>
            </div>
        )}
        {expanded && !filtering && filtered.length > PAGE_SIZE && (
            <div className='mt-8 flex justify-center'>
                <button
                    type='button'
                    onClick={() => setExpanded(false)}
                    className='rounded-full px-6 py-2.5 text-sm font-semibold text-gray-600 ring-1 ring-gray-300 transition hover:ring-gray-900 hover:text-gray-900 dark:text-white/70 dark:ring-white/20 dark:hover:ring-white/50 dark:hover:text-white'
                >
                    Show less
                </button>
            </div>
        )}

        <DocViewer
            item={viewer ? {title: viewer.title, subtitle: viewer.issuer, fileUrl: viewer.fileUrl, imageUrl: typeof viewer.imageUrl === 'string' ? viewer.imageUrl : null} : null}
            onClose={() => setViewer(null)}
        />
    </>
  )
}
