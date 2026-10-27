'use client'

import {usePathname} from 'next/navigation'
import {useEffect} from 'react'

export default function SiteChrome({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/studio')

  useEffect(() => {
    if (isStudio) {
      document.body.style.paddingTop = '0'
      return () => {
        document.body.style.paddingTop = ''
      }
    }
  }, [isStudio])

  if (isStudio) return null
  return <>{children}</>
}
