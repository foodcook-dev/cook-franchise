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
  table: [
    ['날짜', '주문건수', '구매액', '환불건수', '환불액'],
    ['2024-09-01', 21, 12815190, 1, 221970],
    ['2024-09-02', 19, 8610740, 0, 0],
    ['2024-09-03', 27, 8470310, 2, 258760],
    ['2024-09-04', 23, 7650860, 0, 0],
    ['2024-09-05', 17, 8890270, 0, 0],
    ['2024-09-06', 24, 11720236, 0, 0],
    ['2024-09-07', 1, 579320, 0, 0],
    ['2024-09-08', 26, 13170170, 0, 0],
    ['2024-09-09', 18, 5832010, 0, 0],
    ['2024-09-10', 24, 7822620, 1, 30680],
  ]
  daily_stats: {
    string: {
      order_count: number
      cancel_count: number
      paid_amount: number
      canceled_amount: number
    }
  }
}
export type { DateStatisticData }
