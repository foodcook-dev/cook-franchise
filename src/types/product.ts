import { Franchise } from './users'

type pieChartData = {
  chart: [
    {
      date: string
      paid_amount: number
      canceled_amount: number
    },
  ]
  franchise: {
    id: number
    name: string
    headquarters_address: string | null
    contact_email: string | null
    contact_phone: null
  }
  table: [string[]]
}

type DateStatisticData = {
  franchise: {
    id: number
    name: string
    headquarters_address: string | null
    contact_email: string | null
    contact_phone: null
  }
  overall: {
    total_order_count: number
    total_cancel_count: number
    total_paid_amount: number
    total_canceled_amount: number
    incentive: number
    most_purchases_sales_company: {
      sales_company_id: number
      name: string
      total_orders: number
    }
    highest_spending_sales_company: {
      sales_company_id: number
      name: string
      total_amount: number
    }
    unique_sales_companies_count_purchased_during_the_period: number
    total_sales_companies_count: number
  }
  chart: [
    {
      date: string
      paid_amount: number
      canceled_amount: number
    },
  ]
  table: [string[]]
  daily_stats: {
    string: {
      order_count: number
      cancel_count: number
      paid_amount: number
      canceled_amount: number
    }
  }
}

type DateSalesCompanyStatisticData = {
  franchise: Franchise
  table: [string[]]
}
export type { pieChartData, DateStatisticData, DateSalesCompanyStatisticData }
