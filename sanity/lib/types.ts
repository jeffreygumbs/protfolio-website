import type {SanityImageSource} from '@sanity/image-url'
import type {PortableTextBlock} from '@portabletext/types'
import type {StaticImageData} from 'next/image'
import type {ReactNode} from 'react'

export type SiteSettings = {
  name?: string
  role?: string
  location?: string
  introHeadline?: PortableTextBlock[]
  aboutText?: PortableTextBlock[]
  profileImage?: SanityImageSource
  resumeUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  contactEmail?: string
}

export type ExperienceItem = {
  title: string
  location?: string
  description?: string
  icon?: string | ReactNode
  date?: string
}

export type CertificateItem = {
  title: string
  issuer?: string
  date?: string
  description?: string
  imageUrl?: string | StaticImageData
  fileUrl?: string | null
  credentialUrl?: string | null
}

export type ProjectCategoryItem = {
  title: string
  description?: string
  tags: readonly string[]
  imageUrl: string | StaticImageData
  projectUrl: string
}

export type ProjectItem = {
  title: string
  description?: string
  tags: readonly string[]
  imageUrl: string | StaticImageData
  siteUrl: string | null
  gitUrl: string
}
