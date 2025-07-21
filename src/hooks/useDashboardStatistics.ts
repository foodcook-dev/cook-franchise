import {
  getDateFranchiseProductStatistic,
  getDateFranchiseRevenueStatistic,
  getDateFranchiseSalesCompanyStatistic,
} from '@/controller/statistic'
import { useQuery } from '@tanstack/react-query'

import { format } from 'date-fns'

interface Params {
  franchiseId: string | null | number | undefined
  storeId: string | null | number | undefined
  startDate: Date
  endDate: Date
}

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd')

export function useRevenueStatistic({
  franchiseId,
  storeId,
  startDate,
  endDate,
}: Params) {
  return useQuery({
    queryKey: ['revenueStatistic', franchiseId, storeId, startDate, endDate],
    queryFn: () =>
      getDateFranchiseRevenueStatistic({
        franchiseId,
        sales_company_id: storeId,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      }),
    retry: 2,
    // enabled: !!franchiseId && !!startDate && !!endDate,
  })
}

export function useProductStatistic({
  franchiseId,
  storeId,
  startDate,
  endDate,
}: Params) {
  return useQuery({
    queryKey: ['productStatistic', franchiseId, storeId, startDate, endDate],
    queryFn: () =>
      getDateFranchiseProductStatistic({
        franchiseId,
        sales_company_id: storeId,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      }),
    retry: 2,
    // enabled: !!franchiseId && !!startDate && !!endDate,
  })
}

export function useSalesCompanyStatistic({
  franchiseId,
  startDate,
  endDate,
}: Omit<Params, 'storeId'>) {
  return useQuery({
    queryKey: ['salesCompanyStatistic', franchiseId, startDate, endDate],
    queryFn: () =>
      getDateFranchiseSalesCompanyStatistic({
        franchiseId,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      }),
    retry: 2,
    // enabled: !!franchiseId && !!startDate && !!endDate,
  })
}
