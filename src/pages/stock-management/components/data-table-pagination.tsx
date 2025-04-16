import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/custom/button'

interface ServerDataTablePaginationProps {
  totalCount: number | undefined
  pageSize: number
  pageIndex: number
  setPageIndex: (index: number) => void
  hasNextPage: boolean
  hasPreviousPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage?: boolean
}

export function DataTablePagination({
  totalCount,
  pageSize,
  pageIndex,
  setPageIndex,
  // hasNextPage,
  fetchNextPage,
  // isFetchingNextPage,
}: ServerDataTablePaginationProps) {
  return (
    <div className='flex items-center justify-center space-x-4 py-4'>
      <div className='hidden flex-1 text-sm text-muted-foreground sm:block'>
        총 개수 {totalCount ?? 0}개
      </div>

      <Button
        variant='outline'
        className='h-8 w-8 p-0'
        onClick={() => setPageIndex(pageIndex - 1)}
        disabled={pageIndex === 0}
      >
        <span className='sr-only'>이전 페이지</span>
        <ChevronLeftIcon className='h-4 w-4' />
      </Button>

      <span className='text-sm'>{pageIndex + 1}</span>

      <Button
        variant='outline'
        className='h-8 w-8 p-0'
        onClick={() => {
          fetchNextPage()
          setPageIndex(pageIndex + 1)
        }}
        disabled={(pageIndex + 1) * pageSize >= (totalCount ?? 0)}
      >
        <span className='sr-only'>다음 페이지</span>
        <ChevronRightIcon className='h-4 w-4' />
      </Button>
    </div>
  )
}
