import { CircleAlert } from 'lucide-react'
import {
  //   Bar,
  //   BarChart,
  //   CartesianGrid,
  Pie,
  PieChart,
  // Line,
  // LineChart,
  ResponsiveContainer,
  Sector,
  //   XAxis,
  //   YAxis,
} from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { DateStatisticData } from '@/types/product'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

const chartConfig = {
  product_name: {
    label: '상품명',
    color: '--chart-2',
  },
  total_count: {
    label: '총 수량',
    color: '--chart-3',
  },
} satisfies ChartConfig

export function ProductStatistic({ data }: { data: DateStatisticData | null }) {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const chartDataWithColors = data?.chart.map((item) => ({
    ...item,
    fill: getRandomColor(),
  }))

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
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartDataWithColors}
            dataKey='total_count'
            nameKey='product_name'
            innerRadius={60}
            strokeWidth={5}
            activeIndex={0}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
              <Sector {...props} outerRadius={outerRadius + 10} />
            )}
          />
        </PieChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
