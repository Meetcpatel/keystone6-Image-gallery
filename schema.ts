import { list } from '@keystone-6/core'

import {
  image,
  json,
  password,
  relationship,
  text,
} from '@keystone-6/core/fields'

import { Lists } from '.keystone/types'

export const lists: Lists = {
  User: list({
    // Here are the fields that `User` will have. We want an email and password so they can log in
    // a name so we can refer to them, and a way to connect users to posts.
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
    },
    // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  }),
  Product: list({
    fields: {
      images: json({
        label: 'Images',
        ui: {
          views: require.resolve('./galleryComponent'),
          createView: { fieldMode: 'edit' },
          listView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'edit' },
        },
      }),
    },
  }),
  ProductImage: list({
    fields: {
      name: text({
        validation: {
          isRequired: true,
        },
      }),
      altText: text(),
      image: image({ storage: 'my_local_images' }),
    },
  }),
}
