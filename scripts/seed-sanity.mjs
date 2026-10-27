/**
 * Seeds the Sanity dataset with the site's existing content.
 * Usage: set NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN in .env.local,
 * then run: node scripts/seed-sanity.mjs
 */
import {createClient} from '@sanity/client'
import {createReadStream, existsSync, readFileSync} from 'node:fs'
import {resolve} from 'node:path'

for (const file of ['.env.local', '.env']) {
  if (existsSync(file)) {
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({projectId, dataset, token, apiVersion: '2026-10-27', useCdn: false})
const pub = (name) => resolve(process.cwd(), 'public', name)
const key = () => Math.random().toString(36).slice(2, 12)

async function uploadImage(filename) {
  const asset = await client.assets.upload('image', createReadStream(pub(filename)), {filename})
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}
async function uploadFile(filename) {
  const asset = await client.assets.upload('file', createReadStream(pub(filename)), {filename})
  return {_type: 'file', asset: {_type: 'reference', _ref: asset._id}}
}

const span = (text, marks = []) => ({_type: 'span', _key: key(), text, marks})
const para = (...spans) => ({_type: 'block', _key: key(), style: 'normal', markDefs: [], children: spans})

console.log('Uploading assets...')
const images = {}
for (const f of ['web-projects.png','rmtdev.png','AnnAI.png','CodyGPT.png','Anime-Fun.png','teachme.png','Airbnb-ui.png','war-card.png','AnnChat.png','jeff.jpg']) {
  images[f] = await uploadImage(f)
}
const resumeFile = await uploadFile('Jeffrey_Gumbs_Resume.pdf')

const docs = [
  {
    _id: 'siteSettings', _type: 'siteSettings',
    name: 'Jeffrey Gumbs',
    role: 'Software Engineer',
    location: 'Edmonton, AB',
    introHeadline: [para(
      span("Hello, I'm Jeffrey.", ['strong']),
      span(" I'm a "),
      span('software engineer', ['strong']),
      span(' based in Edmonton, AB. I enjoy building '),
      span('sites & apps', ['em']),
      span('. My focus is '),
      span('React, Next.js, and C#/.NET', ['underline']),
    )],
    aboutText: [
      para(
        span('Driven by a passion for programming, I transitioned from a career in '),
        span('nine years in Information Technology', ['strong']),
        span(' to the world of '),
        span('Software Development', ['strong']),
        span('. After earning my Software & Web Developer diploma from Academy of Learning Career College, I built my skills in '),
        span('full-stack development', ['strong']),
        span(', particularly with '),
        span('React, Next.js, Node.js, and C#/.NET', ['strong']),
        span(". I also work as a Learning Coach, mentoring the next cohort of software students. Currently, I'm actively seeking a "),
        span('full-time software engineer position', ['strong']),
        span(' where I can apply my problem-solving skills and enthusiasm for tackling complex challenges.'),
      ),
      para(
        span('Beyond coding', ['em']),
        span(', I relish spending quality time with my family and immersing myself in captivating films. '),
        span('My love for learning extends beyond programming', ['strong']),
        span(" — I'm currently exploring natural language processing (NLP) and the fascinating realms of artificial intelligence and machine learning. Additionally, I'm actively pursuing proficiency in a new language."),
      ),
    ],
    profileImage: images['jeff.jpg'],
    resumeFile,
    linkedinUrl: 'https://www.linkedin.com/in/jeffrey-gumbs-96889984/',
    githubUrl: 'https://github.com/jeffreygumbs',
    contactEmail: 'jeffreygumbs@gmail.com',
  },
  {_id: 'experience-1', _type: 'experience', order: 1, icon: 'code', date: '2023 - present', title: 'Software Engineer (Self-Employed)', location: 'Edmonton, AB', description: 'I lead full-lifecycle development of web and mobile applications for clients — from requirements gathering and design through deployment and maintenance — using React, Node.js, React Native, and Flutter.'},
  {_id: 'experience-2', _type: 'experience', order: 2, icon: 'work', date: '2025 - 2026', title: 'Learning Coach', location: 'Edmonton, AB', description: 'At Academy of Learning Career College, I guide software and web development students through coursework — providing technical instruction, debugging assistance, and project feedback on programming concepts, databases, and web technologies.'},
  {_id: 'experience-3', _type: 'experience', order: 3, icon: 'graduation', date: '2024 - 2025', title: 'Software & Web Developer Diploma', location: 'Edmonton, AB', description: 'Graduated from Academy of Learning Career College, with coursework covering C#, .NET Framework, JavaScript, SQL, HTML/CSS, version control, and project management.'},
  {_id: 'experience-4', _type: 'experience', order: 4, icon: 'work', date: '2014 - 2023', title: 'Information Technology Specialist', location: 'Edmonton, AB', description: 'Nine years at Classic Landscapes providing technical support and systems administration — managing servers and workstations, leading IT projects like system upgrades, and maintaining the server room environment.'},
  {_id: 'certificate-1', _type: 'certificate', order: 1, title: 'Software & Web Developer Diploma', issuer: 'Academy of Learning Career College', date: 'March 2025', description: 'Diploma program covering C#, .NET Framework, JavaScript, SQL, HTML/CSS, version control, and project management.', credentialUrl: null},
  ...['C#','.NET','ASP.NET','JavaScript','TypeScript','Python','HTML','CSS','Bootstrap','Tailwind','React','Angular','Redux','Next.js','Node.js','Express','Deno','SQL Server','MySQL','PostgreSQL','MongoDB','Prisma','Drizzle ORM','React Native','Flutter','Swift','Framer Motion','Git','Docker','Agile'].map((name, i) => ({_id: `skill-${i + 1}`, _type: 'skill', order: i + 1, name})),
  {_id: 'category-web', _type: 'projectCategory', order: 1, title: 'Web Application Development Projects', description: "A showcase of web apps I've built — click through for live demos and source code.", tags: ['React','Next.js','MongoDB','Tailwind','Prisma','and more'], image: images['web-projects.png'], linkUrl: '/web-projects'},
  {_id: 'category-mobile', _type: 'projectCategory', order: 2, title: 'Mobile Application Development Projects', description: "A collection of cross-platform mobile apps I've built — tap any project for details and source code.", tags: ['React Native','Swift','Kotlin','Flutter'], image: images['rmtdev.png'], linkUrl: '/mobile-projects'},
  {_id: 'project-annai', _type: 'project', order: 1, category: 'web', title: 'AnnAI', description: "An AI image generation app powered by OpenAI's DALL·E API — a Midjourney-style tool with a custom interface.", tags: ['Vite','Node.js','Express','Tailwind','MongoDB','OpenAI API'], image: images['AnnAI.png'], siteUrl: 'https://annai.jeffreygumbs.com/', gitUrl: 'https://github.com/jeffreygumbs/AnnAI'},
  {_id: 'project-cody', _type: 'project', order: 2, category: 'web', title: 'CodyGPT', description: 'A ChatGPT-style AI chat application built on the OpenAI API with a Node.js/Express backend.', tags: ['Vite','CSS','Node.js','Express','OpenAI API'], image: images['CodyGPT.png'], siteUrl: 'https://cody.jeffreygumbs.com/', gitUrl: 'https://github.com/jeffreygumbs/cody'},
  {_id: 'project-anime', _type: 'project', order: 3, category: 'web', title: 'Anime Fun', description: 'An anime app built with Next.js, Framer Motion, and Server Actions — inspired by my daughter.', tags: ['Next.js','Framer Motion','Server Actions'], image: images['Anime-Fun.png'], siteUrl: 'https://animefun.jeffreygumbs.com/', gitUrl: 'https://github.com/jeffreygumbs/anime-fun'},
  {_id: 'project-teachme', _type: 'project', order: 4, category: 'web', title: 'Teach Me', description: 'A technical assessment for Inspired Instruction — a full-stack app with auth, database, and transactional email.', tags: ['Next.js','Server Actions','Prisma','Tailwind','Shadcn UI','Supabase','Authjs','zod','resend'], image: images['teachme.png'], siteUrl: 'https://inspiredinstruction-test.vercel.app/', gitUrl: 'https://github.com/jeffreygumbs/teachme'},
  {_id: 'project-airbnb', _type: 'project', order: 1, category: 'mobile', title: 'Airbnb UI Clone', description: 'A faithful recreation of the Airbnb mobile UI, built with React Native, Expo, and Clerk auth.', tags: ['React Native','Expo','Clerk'], image: images['Airbnb-ui.png'], siteUrl: null, gitUrl: 'https://github.com/jeffreygumbs/Airbnb-ui-Clone'},
  {_id: 'project-war', _type: 'project', order: 2, category: 'mobile', title: 'War Cards Game', description: 'The classic War card game, built natively for iOS with SwiftUI.', tags: ['Swift','Swift UI'], image: images['war-card.png'], siteUrl: null, gitUrl: 'https://github.com/jeffreygumbs/War-Card-Game'},
  {_id: 'project-annchat', _type: 'project', order: 3, category: 'mobile', title: 'Ann Chat', description: 'A full-stack video and chat app built with React Native, Expo, Node.js, and Supabase.', tags: ['React Native','Expo','Node.js','Supabase'], image: images['AnnChat.png'], siteUrl: null, gitUrl: 'https://github.com/jeffreygumbs/annChat'},
]

console.log(`Creating ${docs.length} documents...`)
for (const doc of docs) {
  await client.createOrReplace(doc)
}
console.log('Done. Studio: http://localhost:3000/studio')
