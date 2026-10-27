import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from "@/components/footer"
import ActiveSectionContextProvider from '@/context/active-section-context'
import { Toaster } from 'react-hot-toast';
import ThemeSwitch from '@/components/theme-switch'
import ThemeContextProvider from '@/context/theme-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://jeffreygumbs.com'),
  title: 'Jeffrey Gumbs | Software Engineer',
  description: 'Jeffrey Gumbs is a software engineer in Edmonton, AB building web and mobile applications with React, Next.js, C#/.NET, and SQL. Open to full-time opportunities.',
  keywords: ['Jeffrey Gumbs', 'Software Engineer', 'Web Developer', 'React', 'Next.js', 'C#', '.NET', 'Edmonton', 'Calgary'],
  openGraph: {
    title: 'Jeffrey Gumbs | Software Engineer',
    description: 'Software engineer building web & mobile apps with React, Next.js, C#/.NET, and SQL. Open to full-time opportunities.',
    url: 'https://jeffreygumbs.com',
    siteName: 'Jeffrey Gumbs Portfolio',
    images: ['/jeff.jpg'],
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth!' suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-950 dark:text-gray-50 dark:text-opacity-90 relative pt-28 sm:pt-36`}>
        <div className='bg-[#fbe2e3] dark:bg-[#946363] absolute -top-24 -z-10 right-44 h-125 w-125 rounded-full blur-[10rem] sm:w-275'></div>
        <div className='bg-[#dbd7fb] dark:bg-[#676394] absolute -top-4 -z-10 -left-140 h-125 w-200 rounded-full blur-[10rem] sm:w-275 md:-left-132 lg:-left-112 xl:-left-60 2xl:-left-20'></div>
        <ThemeContextProvider>
        <ActiveSectionContextProvider>
        <Header/>
        {children}
        <Toaster
  position="top-right"
  reverseOrder={false}
/>
<Footer/>
<ThemeSwitch/>
        </ActiveSectionContextProvider>
        
        </ThemeContextProvider>
        </body>
    </html>
  )
}
