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
} from './types'

const CACHE = {next: {revalidate: 60, tags: ['portfolio']}}

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

export async function getSkills(): Promise<string[]> {
  if (sanityConfigured) {
    try {
      const docs = await client.fetch<string[]>(
        `*[_type == "skill"] | order(order asc).name`,
        {},
        CACHE,
      )
      if (docs?.length) return docs
    } catch {}
  }
  return [...skillsData]
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
        {title: string; description?: string; tags?: string[]; image?: Parameters<typeof urlFor>[0]; imageMeta?: {width?: number; height?: number}; siteUrl?: string; gitUrl?: string}[]
      >(
        `*[_type == "project" && category == $category] | order(order asc){title, description, tags, image, "imageMeta": image.asset->metadata.dimensions, siteUrl, gitUrl}`,
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
        }))
      }
    } catch {}
  }
  return [...fallback]
}
