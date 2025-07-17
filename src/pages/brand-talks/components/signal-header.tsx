import { Bell } from 'lucide-react'

export default function SignalHeader() {
  return (
    <div className='absolute left-4 top-4 z-50 flex items-center gap-3 rounded-full border-2 border-border bg-background px-5 py-3 shadow-lg backdrop-blur-sm'>
      <div className='relative flex h-8 w-8 items-center justify-center rounded-full bg-primary'>
        <Bell className='h-4 w-4 text-primary-foreground' />
      </div>
      <div className='flex flex-col items-start justify-center gap-1'>
        <p className='text-contrast text-sm font-semibold leading-none'>
          브랜드 톡
        </p>
        <p className='text-contrast/60 text-xs'>메세지를 작성하고 전달하세요</p>
      </div>
    </div>
  )
}
