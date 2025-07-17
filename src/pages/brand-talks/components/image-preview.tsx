import { Button } from '@/components/custom/button'
import { X } from 'lucide-react'

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
    <div className='border-border/20 border-b p-3'>
      <div className='flex max-w-full gap-4'>
        {images.map((image, index) => (
          <div key={index} className='group relative flex-shrink-0'>
            <div className='bg-muted/20 relative overflow-hidden rounded-2xl shadow-lg transition-all duration-200 group-hover:shadow-xl'>
              <img
                src={image.url}
                alt={image.name}
                className='h-24 w-24 object-cover transition-transform duration-200 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
            </div>
            <Button
              type='button'
              onClick={() => onRemove(index)}
              size='icon'
              variant='destructive'
              className='absolute -right-2 -top-2 h-6 w-6 rounded-full shadow-lg transition-all duration-200 hover:scale-110'
            >
              <X className='h-3 w-3' />
            </Button>
            <p className='mt-2 max-w-24 truncate text-center text-xs text-muted-foreground'>
              {image.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
