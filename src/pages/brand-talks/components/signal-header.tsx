import { Bell } from 'lucide-react'

import FranchiseSelect from '@/components/common/FranchiseSelect'

export default function SignalHeader() {
  return (
    <div className='absolute left-3 top-0 z-50 flex items-center gap-4 rounded-2xl border-2 border-border bg-background px-4 py-4 shadow-xl backdrop-blur-md transition-all duration-300'>
      <div className='relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md transition-transform duration-200 hover:scale-105'>
        <Bell className='h-5 w-5 text-primary-foreground' />
      </div>
      <div className='flex min-w-0 flex-col items-start justify-center gap-2'>
        <FranchiseSelect storeShow={false} />
        <p className='text-xs'>프랜차이즈를 선택하고 메세지를 전달하세요</p>
      </div>
    </div>
  )
}
