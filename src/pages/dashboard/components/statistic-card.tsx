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
            {data && data?.result[0]
              ? `+` + data?.result[0]?.total_revenue.toLocaleString()
              : 0}
            원
          </div>

          <div
            className='text-right text-2xl font-bold'
            style={{ color: '#b50000' }}
          >
            +{data && data?.counts?.total_order_count}건
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
            {data && data?.result[0]
              ? `-` + data?.result[0]?.total_tax_free_amount.toLocaleString()
              : 0}
            원
          </div>

          <div
            className='text-right text-2xl font-bold'
            style={{ color: '#0039b5' }}
          >
            -{data && data?.counts?.app_order_count}건
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {t('expected_sales_incentives')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-right text-2xl font-bold'>
            {data && data?.result[0]
              ? data?.result[0]?.app_revenue.toLocaleString()
              : 0}
            원
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {t('excellent_franchise_store')} / {t('franchise_register_count')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-right text-2xl font-bold'>부산 광안점</div>
          <div
            className='text-right text-2xl font-bold'
            style={{ color: '#b50000' }}
          >
            {data && data?.result[0]
              ? data?.result[0]?.new_user_count.toLocaleString()
              : 0}
            개
          </div>
          {/* <p className='text-xs text-muted-foreground'>
            {t('since_last_hour', { amount: '+201' })}
          </p> */}
        </CardContent>
      </Card>
    </>
  )
}
