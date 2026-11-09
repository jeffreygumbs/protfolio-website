"use server"
import React from 'react';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { validateString, getErrorMessage } from '@/lib/utils'
import ContactFormEmail from '@/email/contact-form-email'
import AutoReplyEmail from '@/email/auto-reply-email'
import { getSiteSettings } from '@/sanity/lib/queries'

const resend = new Resend(process.env.RESEND_API_KEY);

const expectedaction = 'contact';
const DEFAULT_PROD_HOSTNAMES = 'jeffreygumbs.com,www.jeffreygumbs.com,jeffreygumbs.vercel.app';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ipSubmissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipSubmissions.get(ip) ?? []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    ipSubmissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipSubmissions.set(ip, recent);
  return false;
}

function isLikelyBotMessage(message: string): boolean {
  const trimmed = message.trim();
  if (trimmed.length < 10) return true;
  const urlCount = (trimmed.match(/https?:\/\/|www\./gi) ?? []).length;
  if (urlCount > 2) return true;
  if (/\b(viagra|casino|crypto\s*airdrop|seo\s*agency|buy\s*backlinks|telegram\s*@)\b/i.test(trimmed)) {
    return true;
  }
  return false;
}

export const sendEmail = async (formData: FormData) => {
  const honeypot = formData.get("companyWebsite");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return {};
  }

  const startedAtRaw = formData.get("formStartedAt");
  const startedAt = typeof startedAtRaw === "string" ? Number(startedAtRaw) : NaN;
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2000) {
    return { error: "Please take a moment before submitting the form." };
  }

  const email = formData.get("senderEmail");
  const message = formData.get("message");
  const token = formData.get("cf-turnstile-response");

  if (!validateString(email, 500) || !EMAIL_REGEX.test((email as string).trim())) {
    return { error: "Please enter a valid email address." };
  }
  if (!validateString(message, 5000) || isLikelyBotMessage(message as string)) {
    return { error: "Please enter a valid message (minimum 10 characters, max 2 links)." };
  }

  const reqHeaders = await headers();
  const forwardedFor = reqHeaders.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  if (clientIp !== "unknown" && isRateLimited(clientIp)) {
    return { error: "Too many messages sent recently. Please try again later." };
  }

  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? DEFAULT_PROD_HOSTNAMES)
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );

  const turnstileSecret = process.env.TURNSTILE_SECRET;
  if (
    !turnstileSecret ||
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    return { error: "Bot verification failed. Please complete the security check." };
  }

  let result: { success?: boolean; action?: string; hostname?: string };
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: token,
        ...(clientIp !== "unknown" ? { remoteip: clientIp } : {}),
      }),
    });
    if (!r.ok) throw new Error(`siteverify ${r.status}`);
    result = await r.json();
  } catch {
    return { error: "Bot verification failed. Please try again." };
  }

  if (
    !result.success ||
    result.action !== expectedaction ||
    !result.hostname ||
    !expectedHostnames.has(result.hostname)
  ) {
    return { error: "Bot verification failed. Please refresh and try again." };
  }

  const normalizedEmail = (email as string).trim();
  const normalizedMessage = (message as string).trim();

  try {
    const settings = await getSiteSettings()
    const {error: sendError} = await resend.emails.send({
        from: 'Jeffrey Gumbs Contact Form <hello@jeffreygumbs.com>',
        to: settings?.contactEmail ?? "jeffreygumbs@gmail.com",
        replyTo: normalizedEmail,
        subject: "Contact Form Submission",
        react: React.createElement(ContactFormEmail,{
            message: normalizedMessage,
            email: normalizedEmail,
            }),
     })
    if (sendError) {
        console.error('Admin notification failed:', sendError)
        return {error: sendError.message}
    }
  } catch (error: unknown) {
    return {
        error: getErrorMessage(error),
    }
  }

  try {
    const {error: replyError} = await resend.emails.send({
        from: 'Jeffrey Gumbs <hello@jeffreygumbs.com>',
        to: normalizedEmail,
        subject: "Thanks for reaching out — Jeffrey Gumbs",
        react: React.createElement(AutoReplyEmail,{
            message: normalizedMessage,
            }),
     })
    if (replyError) console.error('Auto-reply failed:', replyError)
  } catch (error: unknown) {
    console.error('Auto-reply threw:', getErrorMessage(error))
  }
  return {}
}
