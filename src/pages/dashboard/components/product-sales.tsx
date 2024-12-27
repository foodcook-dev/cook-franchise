import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/utils/format'

interface ProductSalesProps {
  data: Array<{
    id: string
    title: string
    unitPrice: number
    count: number
    totalPrice: number
  }>
}

export function ProductSales({ data }: ProductSalesProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[70px]'>상품코드</TableHead>
          <TableHead className='w-[150px] text-center lg:w-auto'>
            상품명
          </TableHead>
          <TableHead>단가</TableHead>
          <TableHead>수량</TableHead>
          <TableHead>총금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{formatPrice(product.unitPrice)}</TableCell>
            <TableCell>{product.count}</TableCell>
            <TableCell>{formatPrice(product.totalPrice)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
