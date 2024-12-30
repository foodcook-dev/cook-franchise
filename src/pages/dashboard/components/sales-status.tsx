import { CircleAlert } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  // Line,
  // LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import { format } from 'date-fns'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { DateStatisticData } from '@/types/product'

const chartConfig = {
  paid_amount: {
    label: '총 수익',
    color: '--chart-2',
  },
  canceled_amount: {
    label: '총 환불',
    color: '--chart-3',
  },
} satisfies ChartConfig

export function SalesStatus({ data }: { data: DateStatisticData | null }) {
  if (!data) {
    return (
      <div
        className='my-4 items-center justify-center'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <CircleAlert className='text-muted' />
        <p className='py-2 text-muted'>데이터가 없어요</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width='100%' height={350}>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={data?.chart}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            // dataKey={(value) => format(new Date(value.date), 'MM/dd')}
            dataKey={(value) =>
              value?.date.includes('w' || 'W')
                ? `${value.date}`
                : format(new Date(value.date), 'MM/dd')
            }
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
          />
          <YAxis
            stroke='#888888'
            fontSize={9}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey='paid_amount'
            type='monotone'
            fill='var(--chart-2)'
            // strokeWidth={2}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey='canceled_amount'
            type='monotone'
            fill='var(--chart-3)'
            radius={[4, 4, 0, 0]}
            // strokeWidth={2}
          />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
