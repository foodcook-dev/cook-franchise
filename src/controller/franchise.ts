import { API } from './api'

// 프랜차이즈 리스트
const getFranchiseList = async () => {
  const result = await API.get('/franchise/franchises/')

  //   console.log('getFranchiseList:', result.data)
  if (result.data) return result.data
  return null
}

// 가맹점 리스트
const getStoreList = async (franchiseId: string) => {
  const result = await API.get(
    `/franchise/franchises/${franchiseId}/sales-companies/`
  )

  //   console.log('getStoreList:', result.data)
  if (result.data) return result.data
  return null
}

// 프랜차이즈 재고관리
const getFranchiseStockList = async ({
  page = 1,
  franchise_id,
  search,
}: {
  page?: number
  franchise_id: string
  search?: string
}): Promise<{
  count: number
  next: string
  previous: string
  results: []
}> => {
  let _query = `&franchise_id=${franchise_id}`
  if (search) {
    _query += `&search_keyword=${search}`
  }

  const response = await API.get(
    `/product/get-stock-management/?page=${page}${_query}`
  )

  // console.log('getFranchiseStockList data', response.data)
  return response.data
}

export { getFranchiseList, getStoreList, getFranchiseStockList }
