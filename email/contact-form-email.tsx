import React from 'react'
import {Html,Body,Head,Heading,Hr,Container,Preview,Section,Text} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

type ContactFormEmailProps = {
    message: string
    email: string
}

export default function ContactFormEmail({message, email}:ContactFormEmailProps) {
  return (
    <Html>
        <Head/>
        <Preview>New message from your portfolio site</Preview>
        <Tailwind>
            <Body className='bg-gray-100'>
                <Container>
                    <Section className='bg-white borderBlack my-10 px-10 py-4 rounded-md'>
                    <Heading className='leading-tight'>Message from your portfolio site</Heading>
                    <Text>{message}</Text>
                    <Hr/>
                    <Text>The sender email is: {email}</Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  )
}
