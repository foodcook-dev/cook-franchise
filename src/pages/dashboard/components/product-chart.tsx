import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { DateStatisticData } from '@/types/product'
import { CircleAlert } from 'lucide-react'
import {
  ResponsiveContainer,
  XAxis,
  AreaChart,
  CartesianGrid,
  Area,
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

export function ProductChart({ data }: { data: DateStatisticData | null }) {
  if (data) {
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
        <AreaChart
          accessibilityLayer
          data={[]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            stroke='#888888'
            fontSize={9}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          <Area
            dataKey='total_revenue'
            type='natural'
            fill='var(--chart-2)'
            fillOpacity={0.8}
            stroke='var(--chart-2)'
            stackId='a'
          />
          <Area
            dataKey='total_tax_free_amount'
            type='natural'
            fill='var(--chart-3)'
            fillOpacity={0.8}
            stroke='var(--chart-3)'
            stackId='b'
          />
        </AreaChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
