"use client"
import React from 'react'
import Link from 'next/link'
import SectionHeading from './section-heading'
import { useSectionInView } from '@/lib/hooks'
import CertificatesGrid from './certificates-grid'
import { BsArrowRight } from 'react-icons/bs'
import type { CertificateItem } from '@/sanity/lib/types'

const PREVIEW_COUNT = 3

export default function Certificates({items}: {items: CertificateItem[]}) {
    const {ref} = useSectionInView("Certificates");
    const hasMore = items.length > PREVIEW_COUNT
  return (
    <section ref={ref} id='certificates' className='mb-28 w-full max-w-[45rem] scroll-mt-28 sm:mb-40'>
        <SectionHeading>Certificates & Diplomas</SectionHeading>
        <CertificatesGrid items={items.slice(0, PREVIEW_COUNT)}/>
        {hasMore && (
            <div className='mt-8 flex justify-center'>
                <Link href='/certificates' className='group flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-gray-700 dark:bg-white/15 dark:hover:bg-white/25'>
                    View all {items.length} certificates <BsArrowRight className='opacity-70 transition group-hover:translate-x-1'/>
                </Link>
            </div>
        )}
    </section>
  )
}
