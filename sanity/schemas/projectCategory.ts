import {defineField, defineType} from 'sanity'

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project Category',
  description: 'The large cards on the homepage that link to project pages.',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'tags', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'linkUrl', title: 'Link URL', type: 'string', description: 'e.g. /web-projects'}),
    defineField({name: 'order', title: 'Sort Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
