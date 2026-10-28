import React from 'react'
import {Html,Body,Head,Heading,Container,Preview,Section,Text,Tailwind,Button,Link,Img,Hr} from '@react-email/components'

type ContactFormEmailProps = {
    message: string
    email: string
}

export default function ContactFormEmail({message, email}:ContactFormEmailProps) {
  return (
    <Html>
        <Head/>
        <Preview>New message from {email} via jeffreygumbs.com</Preview>
        <Tailwind>
            <Body className='bg-[#f4f4f7] font-sans'>
                <Container className='mx-auto my-10 max-w-140 px-4'>
                    <Section className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
                        <Section className='h-1 bg-indigo-600'/>

                        <Section className='px-8 pt-7 pb-5'>
                            <Img src='https://jeffreygumbs.com/logo.png' alt='Jeffrey Gumbs' width='140' height='43'/>
                            <Heading className='m-0 mt-5 text-xl font-bold tracking-tight text-gray-900'>
                                New contact form message
                            </Heading>
                            <Text className='m-0 mt-1 text-sm text-gray-500'>
                                Someone just reached out through your portfolio.
                            </Text>
                        </Section>

                        <Section className='px-8 pb-6'>
                            <Section className='rounded-xl border border-gray-200 bg-gray-50 px-5 py-4'>
                                <Text className='m-0 text-xs font-semibold uppercase tracking-wider text-gray-400'>
                                    From
                                </Text>
                                <Text className='m-0 mt-1 text-base font-semibold text-gray-900'>
                                    {email}
                                </Text>
                                <Hr className='my-3 border-gray-200'/>
                                <Text className='m-0 text-xs font-semibold uppercase tracking-wider text-gray-400'>
                                    Message
                                </Text>
                                <Text className='m-0 mt-2 whitespace-pre-line text-[15px] leading-6 text-gray-800'>
                                    {message}
                                </Text>
                            </Section>

                            <Section className='mt-6 text-center'>
                                <Button
                                    href={`mailto:${email}?subject=Re: Your message to Jeffrey Gumbs`}
                                    className='inline-block rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white'
                                >
                                    Reply to {email}
                                </Button>
                            </Section>
                        </Section>

                        <Section className='border-t border-gray-100 px-8 py-4'>
                            <Text className='m-0 text-xs leading-5 text-gray-400'>
                                Sent from the contact form on{' '}
                                <Link href='https://jeffreygumbs.com' className='text-indigo-500 underline'>
                                    jeffreygumbs.com
                                </Link>{' '}
                                · hitting reply in your inbox works too
                            </Text>
                        </Section>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  )
}
