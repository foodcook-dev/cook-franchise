import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Calendar } from '@/components/ui/calendar'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '../custom/button'

interface DateSelectProps {
  startDate: Date | undefined
  setStartDate: (startDate: Date | undefined) => void
  endDate: Date | undefined
  setEndDate: (endDate: Date | undefined) => void
  handleSubmitDate?: () => void
  handleSubmitQuarter?: (quarter: number) => void
  selectedButton: string | null
  handleSubmitPeriod?: (period: 'daily' | 'weekly' | 'monthly') => void
  handleSelectButton: (value: string) => void
}

export function DateSelect({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSubmitDate,
  // handleSubmitQuarter,
  selectedButton,
  // handleSubmitPeriod,
  handleSelectButton,
}: DateSelectProps) {
  return (
    <div>
      <div className='flex items-center justify-end'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'mr-2 w-[240px] pl-3 text-left font-normal',
                !startDate && 'text-muted-foreground'
              )}
            >
              {startDate ? (
                format(startDate, 'yyyy-MM-dd')
              ) : (
                <span>날짜 선택</span>
              )}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] pl-3 text-left font-normal',
                !endDate && 'text-muted-foreground'
              )}
            >
              {endDate ? format(endDate, 'yyyy-MM-dd') : <span>날짜 선택</span>}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={endDate}
              onSelect={(date) => {
                if (startDate && date && date < startDate) {
                  alert('종료 날짜는 시작 날짜보다 빠를 수 없습니다.')
                  return
                }
                setEndDate(date)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button
          variant={'default'}
          className='ml-2 w-[60px] pl-3 text-left font-normal'
          onClick={handleSubmitDate}
        >
          <span>적용</span>
        </Button>
      </div>

      <div className='my-3 flex justify-end'>
        {/* <p className='mb-2'>분기별</p> */}

        {['daily', 'weekly', 'monthly'].map((period) => (
          <Button
            key={period}
            variant={selectedButton === period ? 'default' : 'outline'}
            className='mr-2 w-[60px] pl-3 text-left font-normal'
            onClick={() => handleSelectButton(period)}
          >
            {
              {
                daily: '일간',
                weekly: '주간',
                monthly: '월간',
              }[period as 'daily' | 'weekly' | 'monthly']
            }
          </Button>
        ))}

        {/* Quarter Buttons */}
        {[1, 2, 3, 4].map((quarter) => (
          <Button
            key={quarter}
            variant={selectedButton === String(quarter) ? 'default' : 'outline'}
            className='ml-2 w-[60px] pl-3 text-left font-normal'
            onClick={() => handleSelectButton(String(quarter))}
          >
            {quarter}분기
          </Button>
        ))}
      </div>
    </div>
  )
}
