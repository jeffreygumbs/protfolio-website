import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({
      name: 'introHeadline',
      title: 'Intro Headline',
      description: 'The big text under your photo. Use bold, italic, and underline for emphasis.',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      description: 'Paragraphs shown in the About section.',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({name: 'profileImage', title: 'Profile Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'resumeFile', title: 'Resume PDF', type: 'file'}),
    defineField({name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'githubUrl', title: 'GitHub URL', type: 'url'}),
    defineField({name: 'contactEmail', title: 'Contact Email', type: 'string'}),
  ],
  preview: {select: {title: 'name', media: 'profileImage'}},
})
