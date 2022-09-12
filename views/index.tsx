/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from 'react'
import { jsx } from '@keystone-ui/core'
import { Checkbox } from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'

import {
  GalleryItem,
  GalleryItem as GalleryItemFields,
} from '../galleryComponent'
import GalleryDrawer from './drawer'

export const GalleryItem = ({
  onClick,
  onRemove,
  item,
  checked = false,
}: {
  onClick?(value: GalleryItemFields): void
  onRemove?(value: GalleryItemFields): void
  item: GalleryItemFields
  checked?: boolean
}) => {
  return (
    <div
      css={{
        backgroundColor: '#e1e5e9',
        borderRadius: '8px',
        paddingBottom: '56.25%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={() => onClick?.(item)}
    >
      {onClick && (
        <div
          css={{
            position: 'absolute',
            zIndex: '1',
            margin: '10px',
            right: '0',
          }}
        >
          <Checkbox checked={checked} readOnly={true}>
            {}
          </Checkbox>
        </div>
      )}
      {onRemove && (
        <div
          css={{
            position: 'absolute',
            zIndex: '1',
            margin: '10px',
            right: '0',
          }}
        >
          <Button size="small" tone="negative" onClick={() => onRemove(item)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      )}
      <img
        css={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        src={item.image.url}
        alt={item.id}
      />
    </div>
  )
}

export const GalleryItemPlaceholder = ({
  children,
  onClick,
}: {
  children?: any
  onClick?(): void
}) => {
  return (
    <div
      onClick={() => onClick?.()}
      css={{
        backgroundColor: '#e1e5e9',
        borderRadius: '8px',
        paddingBottom: '56.25%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  )
}

export const GalleryItemsWrapper = ({ children }: any) => {
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '1rem',
        margin: '30px 0',
      }}
    >
      {children}
    </div>
  )
}

export const Gallery = ({
  listKey,
  value,
  onChange,
  setImages,
}: {
  listKey: string
  value: GalleryItemFields[]
  onChange(value: GalleryItemFields[], isDelete: boolean): void
  setImages: React.Dispatch<React.SetStateAction<GalleryItem[]>>
  images: GalleryItem[]
}) => {
  if (!value) value = []
  const [newValues, setNewValues] = useState<GalleryItemFields[]>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const removeImage = (item: GalleryItemFields) => {
    const newIteam = value?.filter((i) => i.id !== item.id)
    setNewValues(newIteam)
    setImages(newIteam)
    onChange(newIteam, true)
  }

  const addImages = (items: GalleryItemFields[]) => {
    const valueIds = value?.map((i) => i.id)
    const newItems = items.filter((item) => !valueIds.includes(item.id))
    onChange([...value, ...newItems], false)
  }

  const listItems = value?.map((item: GalleryItemFields) => {
    return (
      <GalleryItem
        key={item.id}
        item={item}
        checked={false}
        onRemove={(item) => removeImage(item)}
      />
    )
  })
  const newListItems = newValues?.map((item: GalleryItemFields) => {
    return (
      <GalleryItem
        key={item.id}
        item={item}
        checked={false}
        onRemove={(item) => removeImage(item)}
      />
    )
  })
  return (
    <div>
      <fieldset>
        <legend className='class="css-11ditgu"'>Product Images</legend>
      </fieldset>
      {newListItems ? (
        <GalleryItemsWrapper>{newListItems}</GalleryItemsWrapper>
      ) : (
        <GalleryItemsWrapper>{listItems}</GalleryItemsWrapper>
      )}
      <Button onClick={() => setIsModalOpen(true)}>
        <span>Add Images</span>
      </Button>
      <GalleryDrawer
        listKey={listKey}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onChange={(items) => addImages(items)}
      />
    </div>
  )
}
