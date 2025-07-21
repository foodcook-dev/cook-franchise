import { API } from './api'

const getDateStatistic = async ({
  franchiseId,
  startDate,
  endDate,
}: {
  franchiseId: string
  startDate: string
  endDate: string
}) => {
  const result = await API.get(
    `/franchise/get-franchise-statistic/?franchise_id=${franchiseId}&start_date=${startDate}&end_date=${endDate}`
  )

  if (result.data) return result.data
  return null
}

const getDateProductStatistic = async ({
  franchiseId,
  startDate,
  endDate,
}: {
  franchiseId: string
  startDate: string
  endDate: string
}) => {
  const result = await API.get(
    `/franchise/get-franchise-product-statistic/?franchise_id=${franchiseId}&start_date=${startDate}&end_date=${endDate}`
  )

  if (result.data) return result.data
  return null
}

const getDateFranchiseProductStatistic = async ({
  franchiseId,
  sales_company_id,
  startDate,
  endDate,
}: {
  franchiseId?: string | null | number
  sales_company_id?: string | null | number | undefined
  startDate: string
  endDate: string
}) => {
  let query = ''
  if (franchiseId) {
    query += `franchise_id=${franchiseId}`
  }
  if (sales_company_id && sales_company_id !== 'all') {
    query += `&sales_company_id=${sales_company_id}`
  }
  if (startDate) {
    query += `&start_date=${startDate}`
  }
  if (endDate) {
    query += `&end_date=${endDate}`
  }

  const result = await API.get(
    `/franchise/get-franchise-goods-statistic/?${query}`
  )

  // console.log('getDateFranchiseProductStatistic:', query)
  if (result.data) return result.data
  return null
}

const getDateFranchiseRevenueStatistic = async ({
  franchiseId,
  sales_company_id,
  startDate,
  endDate,
}: {
  franchiseId?: string | null | number
  sales_company_id?: string | null | number | undefined
  startDate: string
  endDate: string
}) => {
  let query = ''
  if (franchiseId) {
    query += `franchise_id=${franchiseId}`
  }
  if (sales_company_id && sales_company_id !== 'all') {
    query += `&sales_company_id=${sales_company_id}`
  }
  if (startDate) {
    query += `&start_date=${startDate}`
  }
  if (endDate) {
    query += `&end_date=${endDate}`
  }

  // console.log('get-franchise-revenue-statistic query:', query)

  const result = await API.get(
    `/franchise/get-franchise-revenue-statistic/?${query}`
  )

  // console.log('getDateFranchiseRevenueStatistic:', result.data)
  if (result.data) return result.data
  return null
}

const getDateFranchiseSalesCompanyStatistic = async ({
  franchiseId,
  startDate,
  endDate,
}: {
  franchiseId?: string | null | number
  startDate: string
  endDate: string
}) => {
  let query = ''
  if (franchiseId) {
    query += `franchise_id=${franchiseId}`
  }
  if (startDate) {
    query += `&start_date=${startDate}`
  }
  if (endDate) {
    query += `&end_date=${endDate}`
  }

  const result = await API.get(
    `/franchise/get-franchise-salescompany-statistic/?${query}`
  )

  // console.log('getDateFranchiseProductStatistic:', result.data)
  if (result.data) return result.data
  return null
}

export {
  getDateStatistic,
  getDateProductStatistic,
  getDateFranchiseProductStatistic,
  getDateFranchiseRevenueStatistic,
  getDateFranchiseSalesCompanyStatistic,
}
