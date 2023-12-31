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
  title: 'Jeffrey | Personal Portfolio',
  description: 'Jeffrey Gumbs is a full-stack web developer based in Alberta, CA with 8 years of experience in web development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='!scroll-smooth'>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-950 dark:text-gray-50 dark:text-opacity-90 relative pt-28 sm:pt-36`}>
        <div className='bg-[#fbe2e3] dark:bg-[#946363] absolute top[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='bg-[#dbd7fb] dark:bg-[#676394] absolute top[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm: w-[68.75rem]md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]'></div>
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
