import React from 'react'
import {Html,Body,Head,Heading,Container,Preview,Section,Text,Tailwind,Button,Link,Img} from '@react-email/components'

type AutoReplyEmailProps = {
    message: string
}

export default function AutoReplyEmail({message}:AutoReplyEmailProps) {
  return (
    <Html>
        <Head/>
        <Preview>Thanks for reaching out — I got your message</Preview>
        <Tailwind>
            <Body className='bg-[#f4f4f7] font-sans'>
                <Container className='mx-auto my-10 max-w-140 px-4'>
                    <Section className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
                        <Section className='h-1 bg-indigo-600'/>

                        <Section className='px-8 pt-7 pb-5'>
                            <Img src='https://jeffreygumbs.com/logo.png' alt='Jeffrey Gumbs' width='140' height='43'/>
                            <Heading className='m-0 mt-5 text-xl font-bold tracking-tight text-gray-900'>
                                Thanks for reaching out
                            </Heading>
                            <Text className='m-0 mt-2 text-[15px] leading-6 text-gray-600'>
                                Hi, I&apos;m Jeffrey — I just received your message through my portfolio contact form. I&apos;ll get back to you within 24–48 hours.
                            </Text>
                        </Section>

                        <Section className='px-8 pb-6'>
                            <Section className='rounded-xl border border-gray-200 bg-gray-50 px-5 py-4'>
                                <Text className='m-0 text-xs font-semibold uppercase tracking-wider text-gray-400'>
                                    Your message
                                </Text>
                                <Text className='m-0 mt-2 whitespace-pre-line text-[15px] leading-6 text-gray-600'>
                                    {message}
                                </Text>
                            </Section>

                            <Section className='mt-6 text-center'>
                                <Button
                                    href='https://jeffreygumbs.com'
                                    className='inline-block rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white'
                                >
                                    View my portfolio
                                </Button>
                            </Section>
                        </Section>

                        <Section className='border-t border-gray-100 px-8 py-4'>
                            <Text className='m-0 text-xs leading-5 text-gray-400'>
                                Jeffrey Gumbs — Software Engineer, Edmonton AB ·{' '}
                                <Link href='https://www.linkedin.com/in/jeffrey-gumbs-96889984/' className='text-indigo-500 underline'>
                                    LinkedIn
                                </Link>
                                {' '}·{' '}
                                <Link href='https://github.com/jeffreygumbs' className='text-indigo-500 underline'>
                                    GitHub
                                </Link>
                            </Text>
                        </Section>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  )
}
