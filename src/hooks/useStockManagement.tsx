import { getFranchiseStockList } from '@/controller/franchise'
import { useInfiniteQuery } from '@tanstack/react-query'

const useStockManagement = ({
  franchiseId,
  query,
}: {
  franchiseId: string
  query?: string | null
}) => {
  const {
    data: franchiseStockList,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['franchiseStockList', franchiseId, query],
    queryFn: async ({ pageParam }) =>
      await getFranchiseStockList({
        page: pageParam,
        franchise_id: franchiseId,
        search: query ? query : undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined
      return allPages.length + 1
    },
    enabled: true,
  })

  return {
    franchiseStockList,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetching,
  }
}

export default useStockManagement
