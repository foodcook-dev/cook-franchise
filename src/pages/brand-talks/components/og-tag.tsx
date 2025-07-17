import { ExternalLink } from 'lucide-react'

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
    <div className='max-w-[400px]'>
      {ogTags.map((og, index) => (
        <a
          key={index}
          href={og.og_tag_link}
          target='_blank'
          rel='noopener noreferrer'
          className='border-border/50 bg-background/90 hover:shadow-primary/5 group block overflow-hidden rounded-2xl border-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'
        >
          {og.og_image && (
            <div className='relative overflow-hidden'>
              <img
                src={og.og_image}
                alt={og.og_title}
                className='h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </div>
          )}
          <div className='p-4'>
            <div className='mb-2 flex items-start justify-between gap-2'>
              <h3 className='line-clamp-2 text-sm font-semibold text-foreground transition-colors duration-200'>
                {og.og_title}
              </h3>
              <ExternalLink className='mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors duration-200' />
            </div>
            <p className='mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground'>
              {og.og_description}
            </p>
            <div className='text-primary/80 truncate text-xs font-medium'>
              {new URL(og.og_tag_link).hostname}
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
