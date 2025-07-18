import { Radio } from 'lucide-react'

import FranchiseSelect from '@/components/common/FranchiseSelect'

export default function SignalHeader() {
  return (
    <div className='border-border/50 absolute left-3 top-0 z-50 flex items-center gap-4 rounded-3xl border bg-white px-6 py-4 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl'>
      <div className='relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl'>
        <Radio className='h-6 w-6 text-primary-foreground drop-shadow-sm' />
      </div>
      <div className='flex min-w-0 flex-col items-start justify-center gap-2'>
        <FranchiseSelect storeShow={false} />
        <p className='text-muted-foreground/80 text-xs'>
          프랜차이즈를 선택하고 메세지를 전달하세요
        </p>
      </div>
    </div>
  )
}
