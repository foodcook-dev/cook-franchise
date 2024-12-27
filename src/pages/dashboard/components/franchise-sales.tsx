import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useTranslations } from 'use-intl'

export function FranchiseSales() {
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
      <TableBody></TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>총 합계</TableCell>

          <TableCell>
            {/* {data?.result[0]?.total_revenue.toLocaleString()}원 */}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
