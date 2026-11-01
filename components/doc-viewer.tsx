"use client"
import React, {useEffect} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BsBoxArrowUpRight, BsX } from 'react-icons/bs'

export type DocViewerItem = {
  title: string
  subtitle?: string
  fileUrl?: string | null
  imageUrl?: string | null
}

export default function DocViewer({item, onClose}: {item: DocViewerItem | null, onClose: () => void}) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

  return (
    <AnimatePresence>
        {item && (
            <motion.div
                className='fixed inset-0 z-9999 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                onClick={onClose}
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
                            <h4 className='truncate text-sm font-semibold text-gray-900 dark:text-white'>{item.title}</h4>
                            {item.subtitle && <p className='truncate text-xs text-gray-500 dark:text-white/50'>{item.subtitle}</p>}
                        </div>
                        <div className='flex shrink-0 items-center gap-2'>
                            {item.fileUrl && (
                                <a href={item.fileUrl} target='_blank' className='rounded-full px-3 py-1.5 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-200 transition hover:bg-indigo-50 dark:text-indigo-400 dark:ring-indigo-900 dark:hover:bg-indigo-950'>
                                    Open in new tab <BsBoxArrowUpRight className='inline'/>
                                </a>
                            )}
                            <button
                                type='button'
                                onClick={onClose}
                                aria-label='Close'
                                className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20'
                            >
                                <BsX className='text-xl'/>
                            </button>
                        </div>
                    </div>
                    <div className='min-h-[60vh] flex-1 bg-gray-100 dark:bg-black/40'>
                        {item.fileUrl ? (
                            <iframe
                                src={item.fileUrl}
                                title={item.title}
                                className='h-[75vh] w-full border-0'
                            />
                        ) : typeof item.imageUrl === 'string' ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className='mx-auto max-h-[75vh] object-contain'
                            />
                        ) : null}
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}
