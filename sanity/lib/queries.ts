import {
  certificatesData,
  experiencesData,
  mobileData,
  projectsData,
  skillsData,
  websiteData,
} from '@/lib/data'
import {sanityConfigured} from '../env'
import {client} from './client'
import {urlFor} from './image'
import type {
  CertificateItem,
  ExperienceItem,
  ProjectCategoryItem,
  ProjectItem,
  SiteSettings,
  SkillGroup,
} from './types'

const CACHE = {next: {revalidate: 60, tags: ['portfolio']}}

const SKILL_CATEGORY_ORDER = ['languages', 'frontend', 'backend', 'mobile', 'databases', 'tools'] as const
const SKILL_CATEGORY_LABELS: Record<string, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  databases: 'Databases & ORM',
  tools: 'Tools & DevOps',
}

const LOCAL_SKILL_CATEGORIES: Record<string, string> = {
  'C#': 'languages', JavaScript: 'languages', TypeScript: 'languages', Python: 'languages',
  HTML: 'frontend', CSS: 'frontend', Bootstrap: 'frontend', Tailwind: 'frontend', React: 'frontend',
  Angular: 'frontend', Redux: 'frontend', 'Next.js': 'frontend', 'Framer Motion': 'frontend',
  '.NET': 'backend', 'ASP.NET': 'backend', 'Node.js': 'backend', Express: 'backend', Deno: 'backend',
  'React Native': 'mobile', Flutter: 'mobile', Swift: 'mobile',
  'SQL Server': 'databases', MySQL: 'databases', PostgreSQL: 'databases', MongoDB: 'databases',
  Prisma: 'databases', 'Drizzle ORM': 'databases',
  Git: 'tools', Docker: 'tools', Agile: 'tools',
}

function groupSkills(names: string[]): SkillGroup[] {
  const groups = new Map<string, string[]>()
  for (const name of names) {
    const cat = LOCAL_SKILL_CATEGORIES[name] ?? 'tools'
    groups.set(cat, [...(groups.get(cat) ?? []), name])
  }
  return SKILL_CATEGORY_ORDER
    .filter((c) => groups.has(c))
    .map((c) => ({category: SKILL_CATEGORY_LABELS[c], items: groups.get(c)!}))
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!sanityConfigured) return null
  try {
    return await client.fetch<SiteSettings>(
      `*[_type == "siteSettings"][0]{
        name, role, location, introHeadline, aboutText, profileImage,
        "resumeUrl": resumeFile.asset->url,
        linkedinUrl, githubUrl, contactEmail
      }`,
      {},
      CACHE,
    )
  } catch {
    return null
  }
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  if (sanityConfigured) {
    try {
      const docs = await client.fetch<ExperienceItem[]>(
        `*[_type == "experience"] | order(order asc){title, location, description, icon, date}`,
        {},
        CACHE,
      )
      if (docs?.length) return docs
    } catch {}
  }
  return [...experiencesData]
}

export async function getCertificates(): Promise<CertificateItem[]> {
  if (sanityConfigured) {
    try {
      const docs = await client.fetch<
        (Omit<CertificateItem, 'imageUrl' | 'fileUrl'> & {diplomaImage?: Parameters<typeof urlFor>[0]; diplomaFileUrl?: string})[]
      >(
        `*[_type == "certificate"] | order(order asc){
          title, issuer, date, description, credentialUrl, diplomaImage,
          "diplomaFileUrl": diplomaFile.asset->url
        }`,
        {},
        CACHE,
      )
      if (docs?.length) {
        return docs.map(({diplomaImage, diplomaFileUrl, ...doc}) => ({
          ...doc,
          imageUrl: diplomaImage ? urlFor(diplomaImage).width(400).auto('format').url() : undefined,
          fileUrl: diplomaFileUrl ?? null,
        }))
      }
    } catch {}
  }
  return [...certificatesData]
}

export async function getSkills(): Promise<SkillGroup[]> {
  if (sanityConfigured) {
    try {
      const docs = await client.fetch<{name: string; category?: string}[]>(
        `*[_type == "skill"] | order(order asc){name, category}`,
        {},
        CACHE,
      )
      if (docs?.length) {
        const groups = new Map<string, string[]>()
        for (const doc of docs) {
          const cat = doc.category ?? 'tools'
          groups.set(cat, [...(groups.get(cat) ?? []), doc.name])
        }
        return SKILL_CATEGORY_ORDER
          .filter((c) => groups.has(c))
          .map((c) => ({category: SKILL_CATEGORY_LABELS[c], items: groups.get(c)!}))
      }
    } catch {}
  }
  return groupSkills([...skillsData])
}

export async function getProjectCategories(): Promise<ProjectCategoryItem[]> {
  if (sanityConfigured) {
    try {
      const docs = await client.fetch<
        {title: string; description?: string; tags?: string[]; image?: Parameters<typeof urlFor>[0]; imageMeta?: {width?: number; height?: number}; linkUrl?: string}[]
      >(`*[_type == "projectCategory"] | order(order asc){title, description, tags, image, "imageMeta": image.asset->metadata.dimensions, linkUrl}`, {}, CACHE)
      if (docs?.length) {
        return docs.map((doc) => ({
          title: doc.title,
          description: doc.description,
          tags: doc.tags ?? [],
          imageUrl: doc.image ? urlFor(doc.image).width(1000).auto('format').url() : '',
          imageWidth: doc.imageMeta?.width,
          imageHeight: doc.imageMeta?.height,
          projectUrl: doc.linkUrl ?? '#',
        }))
      }
    } catch {}
  }
  return [...projectsData]
}

export async function getProjectsByCategory(category: 'web' | 'mobile' | 'cyber'): Promise<ProjectItem[]> {
  const fallback = category === 'mobile' ? mobileData : websiteData
  if (sanityConfigured) {
    try {
      const docs = await client.fetch<
        {title: string; description?: string; tags?: string[]; image?: Parameters<typeof urlFor>[0]; imageMeta?: {width?: number; height?: number}; siteUrl?: string; gitUrl?: string; featured?: boolean}[]
      >(
        `*[_type == "project" && category == $category] | order(order asc){title, description, tags, image, "imageMeta": image.asset->metadata.dimensions, siteUrl, gitUrl, featured}`,
        {category},
        CACHE,
      )
      if (docs?.length) {
        return docs.map((doc) => ({
          title: doc.title,
          description: doc.description,
          tags: doc.tags ?? [],
          imageUrl: doc.image ? urlFor(doc.image).width(1000).auto('format').url() : '',
          imageWidth: doc.imageMeta?.width,
          imageHeight: doc.imageMeta?.height,
          siteUrl: doc.siteUrl ?? null,
          gitUrl: doc.gitUrl ?? '',
          featured: doc.featured ?? false,
        }))
      }
    } catch {}
  }
  return [...fallback]
}

export async function getFeaturedProjects(): Promise<ProjectItem[]> {
  if (sanityConfigured) {
    try {
      const docs = await client.fetch<
        {title: string; description?: string; tags?: string[]; image?: Parameters<typeof urlFor>[0]; imageMeta?: {width?: number; height?: number}; siteUrl?: string; gitUrl?: string}[]
      >(
        `*[_type == "project" && featured == true] | order(order asc){title, description, tags, image, "imageMeta": image.asset->metadata.dimensions, siteUrl, gitUrl}`,
        {},
        CACHE,
      )
      if (docs?.length) {
        return docs.map((doc) => ({
          title: doc.title,
          description: doc.description,
          tags: doc.tags ?? [],
          imageUrl: doc.image ? urlFor(doc.image).width(600).auto('format').url() : '',
          imageWidth: doc.imageMeta?.width,
          imageHeight: doc.imageMeta?.height,
          siteUrl: doc.siteUrl ?? null,
          gitUrl: doc.gitUrl ?? '',
          featured: true,
        }))
      }
    } catch {}
  }
  return websiteData.slice(0, 3).map((p) => ({...p, featured: true}))
}
