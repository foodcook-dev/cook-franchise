import { addDays, startOfMonth, startOfWeek } from 'date-fns'

const formatPrice = (price: number | string | undefined) => {
  if (!price) {
    return '0'
  }
  if (typeof price === 'string') {
    price = parseInt(price)
  }
  return price.toLocaleString()
}

function getDateRangeForPeriod(period: 'daily' | 'weekly' | 'monthly') {
  const today = new Date()
  const yesterday = addDays(today, -1)

  switch (period) {
    case 'daily':
      return {
        startDate: addDays(today, -1),
        endDate: yesterday,
      }

    case 'weekly':
      return {
        startDate: startOfWeek(yesterday),
        endDate: yesterday,
      }

    case 'monthly':
      return {
        startDate: startOfMonth(yesterday),
        endDate: yesterday,
      }
  }
}

function getDateRangeForQuarter(quarter: 1 | 2 | 3 | 4) {
  const year = new Date().getFullYear()

  switch (quarter) {
    case 1:
      return {
        startDate: new Date(year, 0, 1), // January 1st
        endDate: new Date(year, 2, 31), // March 31st
      }
    case 2:
      return {
        startDate: new Date(year, 3, 1), // April 1st
        endDate: new Date(year, 5, 30), // June 30th
      }
    case 3:
      return {
        startDate: new Date(year, 6, 1), // July 1st
        endDate: new Date(year, 8, 30), // September 30th
      }
    case 4:
      return {
        startDate: new Date(year, 9, 1), // October 1st
        endDate: new Date(year, 11, 31), // December 31st
      }
  }
}

export { formatPrice, getDateRangeForPeriod, getDateRangeForQuarter }
