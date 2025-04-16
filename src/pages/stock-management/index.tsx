import FranchiseSelect from '@/components/common/FranchiseSelect'
import { Layout } from '@/components/custom/layout'
// import { Search } from '@/components/search'
// import ThemeSwitch from '@/components/theme-switch'
import { useToast } from '@/components/ui/use-toast'
import useStockManagement from '@/hooks/useStockManagement'
import useAppStore from '@/stores/store'
import { useEffect, useState } from 'react'
import { DataTable } from './components/data-table'
// import { tasks } from '../tasks/data/tasks'
import { columns } from './components/columns'
import { UserNav } from '@/components/user-nav'
import { DataTablePagination } from './components/data-table-pagination'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce'

// import { UserNav } from '@/components/user-nav'

export default function StockManagement() {
  const { toast } = useToast()
  const selectedFranchise = useAppStore((state) => state.selectedFranchise)
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const [pageIndex, setPageIndex] = useState(0)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const {
    franchiseStockList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    hasPreviousPage,
  } = useStockManagement({
    franchiseId: selectedFranchise ? selectedFranchise.id : '',
    query: debouncedQuery || null,
  })

  const pageData = franchiseStockList?.pages[pageIndex]?.results || []

  useEffect(() => {
    // console.log('Selected Franchise:', selectedFranchise)
    if (!selectedFranchise) {
      toast({
        title: '프랜차이즈를 선택해 주세요',
        description:
          '프랜차이즈를 선택하지 않으면 재고 목록을 가져올 수 없습니다.',
        variant: 'destructive',
      })

      return
    }
  }, [selectedFranchise])

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <FranchiseSelect storeShow={false} />
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search /> */}
          {/* <ThemeSwitch /> */}

          <UserNav userInfo={userInfo} />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>재고 관리</h2>
            {/* <p className='text-muted-foreground'>
              프랜차이즈의 재고관리가 가능합니다.
            </p> */}
          </div>
        </div>

        <Input
          placeholder='상품명으로 검색 가능합니다.'
          className='mb-4 h-10 w-[250px] lg:w-[400px]'
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
          }}
        />

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={pageData} columns={columns} />
        </div>

        <DataTablePagination
          totalCount={franchiseStockList?.pages[pageIndex]?.count}
          pageSize={20}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Layout.Body>
    </Layout>
  )
}
