import { CircleAlert } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
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
  total_revenue: {
    label: '총 수익',
    color: '--chart-2',
  },
  total_tax_free_amount: {
    label: '총 환불',
    color: '--chart-3',
  },
} satisfies ChartConfig

export function SalesStatus({ data }: { data: DateStatisticData | null }) {
  if (data && !data?.result[0]) {
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
        <LineChart
          accessibilityLayer
          data={data?.result}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={(value) => format(new Date(value.date), 'MM/dd')}
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
          <Line
            dataKey='total_revenue'
            type='monotone'
            stroke='var(--chart-2)'
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey='total_tax_free_amount'
            type='monotone'
            stroke='var(--chart-3)'
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
