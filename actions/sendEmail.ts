"use server"
import React from 'react';
import { Resend } from 'resend';
import {validateString, getErrorMessage} from '@/lib/utils'
import ContactFormEmail from '@/email/contact-form-email'
import AutoReplyEmail from '@/email/auto-reply-email'
import { getSiteSettings } from '@/sanity/lib/queries'


const resend = new Resend(process.env.RESEND_API_KEY);



export const sendEmail = async (formData: FormData) => {
 const email = formData.get("senderEmail");
 const message = formData.get("message");

 
 
 if(!validateString(email,500)){
    return {
        status: 400,
        message: "Invalid email"
    }
 }
 if(!validateString(message, 5000)){
    return {
        status: 400,
        message: "Invalid message"
    }
 }
try{
    const settings = await getSiteSettings()
    await resend.emails.send({
        from: 'Jeffrey Gumbs Contact Form <onboarding@resend.dev>',
        to: settings?.contactEmail ?? "jeffreygumbs@gmail.com",
        replyTo: email as string,
        subject: "Contact Form Submission",
        react: React.createElement(ContactFormEmail,{
            message: message as string,
             email: email as string,
            }),
     })
} catch (error: unknown) {
    return {
        error: getErrorMessage(error),
    }
}
// best-effort auto-reply — requires a verified sending domain in Resend
try{
    await resend.emails.send({
        from: 'Jeffrey Gumbs <hello@jeffreygumbs.com>',
        to: email as string,
        subject: "Thanks for reaching out — Jeffrey Gumbs",
        react: React.createElement(AutoReplyEmail,{
            message: message as string,
            }),
     })
} catch {
    // auto-reply is best-effort — never fail the form over it
}
return{}
}