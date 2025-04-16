import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { pieChartData } from '@/types/product'
import { CircleAlert } from 'lucide-react'
// import { useTranslations } from 'use-intl'

export function ProductSales({ data }: { data: pieChartData | null }) {
  // const t = useTranslations('dashboard')

  if (
    !data?.table ||
    data.table.length === undefined ||
    data.table.length === (1 as number)
  ) {
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
    <Table className=''>
      <TableHeader>
        <TableRow>
          {data?.table?.[0].map((item, index) => (
            <TableHead className='text-center' key={index}>
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.table?.slice(1).map((row, index) => (
          <TableRow key={index}>
            <TableCell className='text-center'>{row[0]}</TableCell>
            <TableCell className='max-w-[100px] text-center'>
              {row[1]}
            </TableCell>
            <TableCell className='text-center'>{row[2]}개</TableCell>
            <TableCell className='text-center'>
              {row[3]?.toLocaleString()}원
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={4}>총 합계</TableCell> */}

          <TableCell>
            {/* {data?.result[0]?.total_revenue.toLocaleString()}원 */}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
