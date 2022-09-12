import React from 'react'
import { FieldProps } from '@keystone-6/core/types'
import { FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/json/views'
import { useState } from 'react'
import { Gallery, GalleryItem } from './views'
export type ImageData = {
  height: number
  width: number
  filesize: number
  extension: string
  id: string
  url: string
}

export type GalleryItem = {
  id: string
  name: string
  image: ImageData
}
interface ImageType {
  image: GalleryItem[]
}

export const Field = ({ value, onChange }: FieldProps<typeof controller>) => {
  const [images, setImages] = useState<GalleryItem[]>([])
  let imageArrLength = value && JSON.parse(value)?.length
  let latestArr = value && JSON.parse(value)[imageArrLength - 1]?.images
  const productImages: ImageType[] = value ? JSON.parse(value) : []

  const onSubmitNewRelatedLink = () => {
    if (images.length > 0 || latestArr.length > 0) {
      const imagesCopy = [...productImages, { images: images ?? latestArr }]
      onChange && onChange(JSON.stringify(imagesCopy))
    } else {
      const imagesCopy = [...productImages]
      onChange && onChange(JSON.stringify(imagesCopy))
    }
  }

  const addImages = (items: GalleryItem[], isDelete: boolean) => {
    if (!isDelete) {
      const valueIds = images.map((i) => i.id)
      const newItems = items.filter((item) => !valueIds.includes(item.id))
      setImages([...images, ...newItems])
    } else {
      setImages(items)
    }
  }

  const firstRender = React.useRef(true)

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      onSubmitNewRelatedLink()
    }
  }, [images])

  return (
    <FieldContainer>
      <Gallery
        listKey={'ProductImage'} // <----- Change is  ProductImage
        value={images.length <= 0 ? latestArr : images}
        onChange={(items, isDelete) => {
          addImages(items, isDelete)
        }}
        setImages={setImages}
        images={images}
      />
    </FieldContainer>
  )
}
