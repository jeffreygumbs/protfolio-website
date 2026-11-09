"use client"
import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import SectionHeading from './section-heading'
import { useSectionInView } from '@/lib/hooks';
import SubmitBtn from '@/components/submit-btn'
import { motion } from 'framer-motion';
import { sendEmail } from "@/actions/sendEmail"
import toast from 'react-hot-toast';

type TurnstileWidgetId = string;
type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    },
  ) => TurnstileWidgetId;
  reset: (widgetId: TurnstileWidgetId) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '0x4AAAAAAF5bUZoezvz5Km7k';

export default function Contact({email = 'jeffreygumbs@gmail.com'}: {email?: string}) {
  const {ref} = useSectionInView("Contact");
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const contactWidgetId = useRef<TurnstileWidgetId | null>(null);
  const [token, setToken] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());

  function renderTurnstile() {
    if (!turnstileContainer.current || contactWidgetId.current !== null || !window.turnstile) return;
    contactWidgetId.current = window.turnstile.render(turnstileContainer.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: 'contact',
      callback: setToken,
      'expired-callback': () => setToken(""),
      'error-callback': () => setToken(""),
    });
  }

  useEffect(() => {
    renderTurnstile();
  }, []);

  return (
    <motion.section ref={ref} id='contact' className='scroll-mt-28 mb-28 sm:mb-28 w-[min(100%,38rem)]' initial={{ opacity:0}} whileInView={{ opacity:1}} transition={{duration: 1}} viewport={{once: true}}>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderTurnstile}
        />
        <SectionHeading>Contact Me</SectionHeading>
        <p className='text-gray-700 text-center -mt-6 dark:text-white/80'>Please contact me directly at <a className='underline' href={`mailto:${email}`}>{email}</a> or through this form.</p>
        <form
          ref={formRef}
          action={async (formData) => {
            try {
              const {error} = await sendEmail(formData)
              if(error){
                toast.error(error);
                return
              }
              formRef.current?.reset();
              setStartedAt(Date.now());
              toast.success('Email sent successfully')
            } finally {
              if (contactWidgetId.current !== null && window.turnstile) {
                window.turnstile.reset(contactWidgetId.current);
                setToken("");
              }
            }
          }}
          className='mt-10 flex flex-col dark:text-black'
        >
            <input
              type="text"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            <input type="hidden" name="formStartedAt" value={startedAt} />
            <input name="senderEmail" className='h-14 px-4 rounded-xl borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/30' type='email' required maxLength={500} placeholder='Your Email'/>
            <textarea name="message" className='h-52 my-3 rounded-xl borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/30' placeholder='Your Message' required minLength={10} maxLength={5000}/>
            <div className="mt-2 flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
              <div ref={turnstileContainer} />
              <SubmitBtn disabled={!token} />
            </div>
        </form>
    </motion.section>
  )
}
