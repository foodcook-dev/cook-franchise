interface OGTag {
  og_image?: string
  og_title: string
  og_description: string
  og_tag_link: string
}

interface OGTagProps {
  ogTags: OGTag[]
}

export default function OGTag({ ogTags }: OGTagProps) {
  if (!ogTags || ogTags.length === 0) return null

  return (
    <div className='max-w-[600px]'>
      {ogTags.map((og, index) => (
        <div
          key={index}
          className='text-contrast overflow-hidden rounded-lg border-2 border-border bg-background shadow-md'
        >
          {og.og_image && (
            <img
              src={og.og_image}
              alt={og.og_title}
              className='h-32 w-full object-cover'
            />
          )}
          <div className='p-3'>
            <h3 className='mb-1 line-clamp-2 text-sm font-medium'>
              {og.og_title}
            </h3>
            <p className='mb-1 line-clamp-3 text-xs'>{og.og_description}</p>
            <a
              href={og.og_tag_link}
              target='_blank'
              className='text-xs font-medium text-blue-600 no-underline transition-opacity hover:opacity-80'
            >
              {og.og_tag_link}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
