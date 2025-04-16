import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

import { labels } from '../data/data'
import { Task } from '../data/schema'
import { format } from 'date-fns'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='id' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'product_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='상품명' />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className='flex space-x-2'>
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('product_name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'branch',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='브랜치' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('branch')}</div>,
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='재고' />
    ),
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number
      const minStock = row.getValue('min_stock') as number
      return (
        <div
          className='w-[80px]'
          style={{ color: stock < minStock ? 'red' : '#000' }}
        >
          {stock}
        </div>
      )
    },
  },
  {
    accessorKey: 'min_stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='최소 재고' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('min_stock')}</div>
    ),
  },
  {
    accessorKey: 'optimal_stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='적정 재고' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('optimal_stock')}</div>
    ),
  },
  {
    accessorKey: 'last_synced_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='재고 측정시간' />
    ),
    cell: ({ row }) => (
      <div className='w-[120px]'>
        {format(row.getValue('last_synced_at'), 'yy/MM/dd HH:mm:ss')}
      </div>
    ),
  },

  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Status' />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue('status')
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className='flex w-[100px] items-center'>
  //         {status.icon && (
  //           <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Priority' />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue('priority')
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className='flex items-center'>
  //         {priority.icon && (
  //           <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
