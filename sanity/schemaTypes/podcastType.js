import {defineField, defineType} from 'sanity'

export const podcastType = defineType({
  name: 'podcast',
  title: 'Podcast',
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
      name: 'audioFile',
      type: 'file',
      title: 'Audio File',
      options: {
        accept: 'audio/*'
      }
    }),
    defineField({
      name: 'videoFile',
      type: 'file',
      title: 'Podcast Video',
      options: {
        accept: 'video/*'
      }
    }),
    defineField({
      name: 'duration',
      type: 'string',
      title: 'Duration (e.g. "45 MINS")',
    }),
    defineField({
      name: 'episodeNumber',
      type: 'number',
      title: 'Episode Number',
    }),
    defineField({
      name: 'guestName',
      type: 'string',
      title: 'Guest Name',
    }),
  ],
})
