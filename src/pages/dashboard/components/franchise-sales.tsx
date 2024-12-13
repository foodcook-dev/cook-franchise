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
import { useTranslations } from 'use-intl'
import { format } from 'date-fns'

export function FranchiseSales({ data }: { data: DateStatisticData | null }) {
  const t = useTranslations('dashboard')
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>날짜</TableHead>
          <TableHead>{t('total_order_count')}</TableHead>
          <TableHead>{t('total_revenue')}</TableHead>
          <TableHead>{t('total_refund')}</TableHead>
          <TableHead>{t('total_revenue')}</TableHead>

          {/* <TableHead className='text-right'></TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.result.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{format(item.date, 'MM/dd')}</TableCell>
            <TableCell>{item.total_order_count}</TableCell>
            <TableCell>{item.total_tax_free_amount.toLocaleString()}</TableCell>
            <TableCell>{item.total_revenue.toLocaleString()}</TableCell>
            <TableCell>{item.app_revenue.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>총 합계</TableCell>

          <TableCell>
            {data?.result[0]?.total_revenue.toLocaleString()}원
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
