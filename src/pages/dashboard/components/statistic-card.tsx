import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DateStatisticData } from '@/types/product'
import { useTranslations } from 'use-intl'

interface StatisticProps {
  data: DateStatisticData | null
}

export function StatisticCard({ data }: StatisticProps) {
  const t = useTranslations('dashboard')
  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {t('total_revenue')} / {t('total_order_count')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className='text-right text-2xl font-bold'
            style={{ color: '#b50000' }}
          >
            {data && data?.overall
              ? data?.overall?.total_paid_amount.toLocaleString()
              : 0}
            원
          </div>

          <div
            className='text-right text-2xl font-bold'
            style={{ color: '#b50000' }}
          >
            {data && data?.overall ? data?.overall?.total_order_count : 0}건
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {t('total_refund')} / {t('total_refund_count')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className='text-right text-2xl font-bold'
            style={{ color: '#0039b5' }}
          >
            {data && data?.overall
              ? data?.overall?.total_canceled_amount.toLocaleString()
              : 0}
            원
          </div>

          <div
            className='text-right text-2xl font-bold'
            style={{ color: '#0039b5' }}
          >
            {data && data?.overall ? data?.overall?.total_cancel_count : 0}건
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {t('partial_refund')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-right text-2xl font-bold'>
            {/* {data && data?.overall
              ? data?.overall?.incentive.toLocaleString()
              : 0} */}
            0 원
          </div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {t('excellent_franchise_store')} /{' '}
            {t('excellent_franchise_sales_total_amount')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-right text-2xl font-bold'>
            {data && data?.overall
              ? data?.overall?.highest_spending_sales_company?.name
              : ''}
          </div>
          <div
            className='text-right text-2xl font-bold'
            style={{ color: '#b50000' }}
          >
            {data && data?.overall
              ? data?.overall?.highest_spending_sales_company?.total_amount.toLocaleString()
              : 0}
            원
          </div>
   
        </CardContent>
      </Card> */}
    </>
  )
}
