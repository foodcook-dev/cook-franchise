import { useState } from 'react'
import { X } from 'lucide-react'

interface ContentImagesProps {
  images: string[]
}

export default function ContentImages({ images }: ContentImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!images || images.length === 0) return null

  return (
    <>
      <div
        className='grid max-w-[800px] gap-2'
        style={{
          gridTemplateColumns:
            images.length === 1
              ? '1fr'
              : images.length === 2
                ? 'repeat(2, 1fr)'
                : images.length === 3
                  ? 'repeat(3, 1fr)'
                  : images.length === 4
                    ? 'repeat(4, 1fr)'
                    : images.length === 5
                      ? 'repeat(5, 1fr)'
                      : 'repeat(2, 1fr)',
        }}
      >
        {images.slice(0, 5).map((imageUrl, index) => (
          <div
            key={index}
            className='group relative cursor-pointer overflow-hidden rounded-xl'
            onClick={() => setSelectedImage(imageUrl)}
          >
            <img
              src={imageUrl}
              alt={`image-${index + 1}`}
              className='h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
            {index === 4 && images.length > 5 && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/60 text-lg font-semibold text-white'>
                +{images.length - 5}
              </div>
            )}
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'
          onClick={() => setSelectedImage(null)}
        >
          <div className='relative max-h-[90vh] max-w-[90vw]'>
            <img
              src={selectedImage}
              alt='확대된 이미지'
              className='max-h-full max-w-full rounded-lg object-contain shadow-2xl'
            />
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white'
            >
              <X className='h-5 w-5' />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
