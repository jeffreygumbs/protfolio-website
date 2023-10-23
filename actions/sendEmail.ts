"use server"
import React from 'react';
import { Resend } from 'resend';
import {validateString, getErrorMessage} from '@/lib/utils'
import ContactFormEmail from '@/email/contact-form-email'


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
 let data
try{
    await resend.emails.send({
        from: 'Jeffrey Gumbs Contact Form <onboarding@resend.dev>',
        to: "jeffreygumbs@gmail.com",
        reply_to: email as string,
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
    return{data}
}
}