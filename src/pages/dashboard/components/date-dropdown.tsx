import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/custom/button'
import { Calendar } from '@/components/ui/calendar'

export function DateDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='ml-auto h-8 lg:flex'>
          <p>기간</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-auto' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <DropdownMenuItem>
            <Calendar
              mode='single'
              className='w-auto p-0'
              // selected={field.value}
              // onSelect={field.onChange}
              disabled={(date: Date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              initialFocus
            />
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>일간</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
