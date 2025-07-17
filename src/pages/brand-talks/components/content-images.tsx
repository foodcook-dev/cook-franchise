interface ContentImagesProps {
  images: string[]
}

export default function ContentImages({ images }: ContentImagesProps) {
  if (!images || images.length === 0) return null

  return (
    <div className='flex gap-2'>
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`image-${index + 1}`}
          className='h-32 w-full rounded-lg object-cover'
        />
      ))}
    </div>
  )
}
