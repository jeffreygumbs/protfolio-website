import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'tags', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'siteUrl', title: 'Live Site URL', type: 'url', description: 'Leave empty for projects with no live demo'}),
    defineField({name: 'gitUrl', title: 'GitHub URL', type: 'url'}),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Web', value: 'web'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'Cybersecurity', value: 'cyber'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false, description: 'Featured projects appear directly on the homepage'}),
    defineField({name: 'order', title: 'Sort Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
