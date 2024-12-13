import { API } from './api'

const getDateStatistic = async ({
  startDate,
  endDate,
}: {
  startDate: string
  endDate: string
}) => {
  const result = await API.get(
    `/statistic/api/get_today_sales?from=${startDate}&to=${endDate}`
  )
  if (result.data.result) return result.data
  return null
}

export { getDateStatistic }
