import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DateStatisticData } from '@/types/product'
// import { useTranslations } from 'use-intl'

export function ProductSales({ data }: { data: DateStatisticData | null }) {
  // const t = useTranslations('dashboard')
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
            <TableCell className='text-center'>{row[1]}</TableCell>
            <TableCell className='text-center'>
              {row[2]?.toLocaleString()}원
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
