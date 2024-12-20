import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { DateStatisticData } from '@/types/product'
import { format } from 'date-fns'
import { CircleAlert } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

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

export function Overview({ data }: { data: DateStatisticData | null }) {
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
        <BarChart data={data?.result} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={(value) => format(new Date(value.date), 'MM/dd')}
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            tickMargin={10}
            tickFormatter={(value) => value}
            axisLine={false}
          />
          <YAxis
            stroke='#888888'
            fontSize={9}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator='dashed' />}
          />

          <Bar
            dataKey='total_revenue'
            fill='var(--chart-2)'
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey='total_tax_free_amount'
            fill='var(--chart-3)'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
