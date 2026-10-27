import {defineField, defineType} from 'sanity'

export const certificate = defineType({
  name: 'certificate',
  title: 'Certificate / Diploma',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'issuer', type: 'string'}),
    defineField({name: 'date', type: 'string', description: 'e.g. "March 2025"'}),
    defineField({name: 'description', type: 'text'}),
    defineField({
      name: 'diplomaImage',
      title: 'Diploma / Certificate Image',
      description: 'Upload a scan or photo of the diploma or certificate — shown on the site.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'diplomaFile',
      title: 'Diploma / Certificate PDF',
      description: 'Upload the PDF — visitors can open it from the "View document" link.',
      type: 'file',
      options: {accept: 'application/pdf'},
    }),
    defineField({name: 'credentialUrl', title: 'Credential URL', type: 'url', description: 'Optional verification link'}),
    defineField({name: 'order', title: 'Sort Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
