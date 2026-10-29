import {defineField, defineType} from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Languages', value: 'languages'},
          {title: 'Frontend', value: 'frontend'},
          {title: 'Backend', value: 'backend'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'Databases & ORM', value: 'databases'},
          {title: 'Tools & DevOps', value: 'tools'},
        ],
        layout: 'radio',
      },
    }),
    defineField({name: 'order', title: 'Sort Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
