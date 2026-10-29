import React from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Footer() {
  const logoW = 160;
  const logoH = 49;
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <Image
        src={logo}
        alt="Jeffrey Gumbs"
        width={logoW}
        height={logoH}
        className="mx-auto mb-3 h-8 w-auto opacity-80 dark:invert-0"
      />
      <small className="mb-2 block text-xs">
        &copy; {new Date().getFullYear()} Jeffrey. All rights reserved.
      </small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion, React Email & Resend, Vercel hosting.
      </p>
    </footer>
  );
}
