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

export { getDateStatistic }
