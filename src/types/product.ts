type DateStatisticData = {
  result: [
    {
      id: number
      date: string
      created: string
      total_revenue: number
      app_revenue: number
      admin_revenue: number
      total_tax_free_amount: number
      total_tax_amount: number
      app_tax_free_amount: number
      app_tax_amount: number
      admin_tax_free_amount: number
      admin_tax_amount: number
      purchase_amount: number
      purchase_tax_free_amount: number
      purchase_tax_amount: number
      new_user_count: number
      total_order_count: number
      app_order_count: number
      admin_order_count: number
    },
  ]
  counts: {
    app_order_count: number
    total_order_count: number
    unconfirmed_sales_company_count: number
  }
}

export type { DateStatisticData }
