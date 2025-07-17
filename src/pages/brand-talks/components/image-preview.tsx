import { Button } from '@/components/custom/button'

interface ImagePreviewProps {
  images: Array<{
    url: string
    name: string
  }>
  onRemove: (index: number) => void
}

export default function ImagePreview({ images, onRemove }: ImagePreviewProps) {
  if (images.length === 0) return null

  return (
    <div className='border-border/50 border-b p-3'>
      <div className='flex max-w-md gap-4'>
        {images.map((image, index) => (
          <div key={index} className='relative'>
            <img
              src={image.url}
              alt={image.name}
              className='h-20 w-full rounded-lg object-cover'
            />
            <Button
              type='button'
              onClick={() => onRemove(index)}
              className=' absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600'
            >
              X
            </Button>
            <p className='mt-1 truncate text-xs'>{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
