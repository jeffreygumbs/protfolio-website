import {defineField, defineType} from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'location', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({
      name: 'icon',
      type: 'string',
      options: {
        list: [
          {title: 'Work', value: 'work'},
          {title: 'Code / React', value: 'code'},
          {title: 'Graduation', value: 'graduation'},
        ],
        layout: 'radio',
      },
      initialValue: 'work',
    }),
    defineField({name: 'date', type: 'string', description: 'e.g. "2023 - present"'}),
    defineField({name: 'order', title: 'Sort Order', type: 'number', description: 'Lower numbers appear first'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
