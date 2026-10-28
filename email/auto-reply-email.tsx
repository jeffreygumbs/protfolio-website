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
                <Container className='mx-auto my-10 max-w-[560px] px-4'>
                    <Section className='overflow-hidden rounded-2xl bg-white shadow-sm'>
                        <Section className='bg-indigo-600 px-8 py-6'>
                            <Img src='https://jeffreygumbs.com/logo.png' alt='JG' width='44' height='44' className='mb-3 rounded-xl'/>
                            <Text className='m-0 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100'>
                                jeffreygumbs.com
                            </Text>
                            <Heading className='m-0 mt-1 text-2xl font-bold text-white'>
                                Thanks for reaching out 👋
                            </Heading>
                        </Section>

                        <Section className='px-8 py-6'>
                            <Text className='m-0 text-[15px] leading-6 text-gray-800'>
                                Hi, I&apos;m Jeffrey — I just received your message through my portfolio contact form. I&apos;ll get back to you within 24–48 hours.
                            </Text>

                            <Section className='mt-5 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4'>
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
                                    className='inline-block rounded-full bg-gray-900 px-7 py-3 text-sm font-semibold text-white'
                                >
                                    View my portfolio
                                </Button>
                            </Section>
                        </Section>
                    </Section>

                    <Section className='mt-6 px-4 text-center'>
                        <Text className='m-0 text-xs leading-5 text-gray-400'>
                            Jeffrey Gumbs — Software Engineer, Edmonton AB ·{' '}
                            <Link href='https://www.linkedin.com/in/jeffrey-gumbs-96889984/' className='text-indigo-500 underline'>
                                LinkedIn
                            </Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  )
}
