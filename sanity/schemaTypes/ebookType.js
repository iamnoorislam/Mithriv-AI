import {defineField, defineType} from 'sanity'

export const ebookType = defineType({
  name: 'ebook',
  title: 'Ebook',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Date',
    }),
    defineField({
      name: 'pdfUrl',
      type: 'url',
      title: 'PDF Download URL',
    }),
  ],
})
