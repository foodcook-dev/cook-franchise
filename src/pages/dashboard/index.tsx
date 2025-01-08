import { Layout } from '@/components/custom/layout'
import {
  startOfWeek,
  // endOfWeek,
  startOfMonth,
  // endOfMonth,
  format,
  addDays,
} from 'date-fns'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import ThemeSwitch from '@/components/theme-switch'
// import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { RecentSales } from './components/recent-sales'

import { useTranslations } from 'use-intl'
import LanguageSwitch from '@/components/language-switch'
// import { ProductChart } from './components/product-chart'
// import { ProductSales } from './components/product-sales'

// import { productColumns } from './components/product-columns'

import { DateSelect } from '@/components/ui/date-select'
import { useEffect, useState } from 'react'
import {
  getDateProductStatistic,
  getDateStatistic,
} from '@/controller/statistic'
import { StatisticCard } from './components/statistic-card'
import { DateStatisticData } from '@/types/product'
import { SalesStatus } from './components/sales-status'
import { useToast } from '@/components/ui/use-toast'
import { Franchise } from '@/types/users'
import { ProductStatistic } from './components/product-statistic'
import { ProductSales } from './components/product-sales'
// import { FranchiseSales } from './components/franchise-sales'

export default function Dashboard() {
  const t = useTranslations('dashboard')
  const { toast } = useToast()
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const franchiseInfo: Franchise =
    localStorage.getItem('franchiseInfo') !== undefined
      ? JSON.parse(localStorage.getItem('franchiseInfo') || 'null')
      : null

  const [statisticData, setStatisticData] = useState<DateStatisticData | null>(
    null
  )

  const [productStatisticData, setProductStatisticData] =
    useState<DateStatisticData | null>(null)

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const [selectedButton, setSelectedButton] = useState<string | null>(null)

  const handleSelectButton = (value: string) => {
    setSelectedButton(value)

    if (['daily', 'weekly', 'monthly'].includes(value)) {
      handleSubmitPeriod &&
        handleSubmitPeriod(value as 'daily' | 'weekly' | 'monthly')
    } else if (['1', '2', '3', '4'].includes(value)) {
      handleSubmitQuarter && handleSubmitQuarter(Number(value) as 1 | 2 | 3 | 4)
    }
  }

  const handleSubmitDate = async () => {
    // const today = new Date()
    if (!startDate) {
      alert('시작 날짜를 선택해주세요.')
      return
    }
    if (!endDate) {
      alert('종료 날짜를 선택해주세요.')
      return
    }
    if (startDate && endDate && endDate < startDate) {
      alert('종료 날짜는 시작 날짜보다 빠를 수 없습니다.')
      return
    }

    // if (endDate > today) {
    //   alert('종료 날짜는 오늘 날짜보다 미래일 수 없습니다.')
    //   return
    // }

    console.log('startDate', startDate)
    console.log('endDate', endDate)

    setSelectedButton(null)

    try {
      const response = await getDateStatistic({
        franchiseId: franchiseInfo ? franchiseInfo?.id.toString() : '',
        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
      })

      if (response) {
        setStatisticData(response)
      }

      console.log('response', response)
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('An error occurred:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setStatisticData(null)
      return
    }

    try {
      const productResponse = await getDateProductStatistic({
        franchiseId: franchiseInfo ? franchiseInfo?.id.toString() : '',
        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
      })

      if (productResponse) {
        setProductStatisticData(productResponse)
      }

      console.log('response', productResponse)
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('An error occurred:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setProductStatisticData(null)
      return
    }
  }

  const handleSubmitPeriod = async (period: 'daily' | 'weekly' | 'monthly') => {
    const today = new Date()

    let newStartDate: Date | undefined
    let newEndDate: Date | undefined

    switch (period) {
      case 'daily':
        newStartDate = addDays(today, -1)
        newEndDate = today
        break

      case 'weekly':
        newStartDate = startOfWeek(today)
        // newEndDate = endOfWeek(today)
        newEndDate = today
        break

      case 'monthly':
        newStartDate = startOfMonth(today)
        // newEndDate = endOfMonth(today)
        newEndDate = today
        break

      default:
        break
    }

    // 상태 업데이트
    setStartDate(newStartDate)
    setEndDate(newEndDate)

    try {
      // 요청에 새로 계산한 날짜를 사용
      const response = await getDateStatistic({
        franchiseId: franchiseInfo ? franchiseInfo?.id.toString() : '',
        startDate: newStartDate ? format(newStartDate, 'yyyy-MM-dd') : '',
        endDate: newEndDate ? format(newEndDate, 'yyyy-MM-dd') : '',
      })

      if (response) {
        setStatisticData(response)
      }

      console.log('response', response)
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('An error occurred:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setStatisticData(null)
      return
    }

    try {
      // 요청에 새로 계산한 날짜를 사용
      const productResponse = await getDateProductStatistic({
        franchiseId: franchiseInfo ? franchiseInfo?.id.toString() : '',
        startDate: newStartDate ? format(newStartDate, 'yyyy-MM-dd') : '',
        endDate: newEndDate ? format(newEndDate, 'yyyy-MM-dd') : '',
      })

      if (productResponse) {
        setProductStatisticData(productResponse)
      }

      console.log('response', productResponse)
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('An error occurred:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setProductStatisticData(null)
      return
    }
  }

  const handleSubmitQuarter = async (quarter: number) => {
    const year = new Date().getFullYear()
    let start, end

    switch (quarter) {
      case 1:
        start = new Date(year, 0, 1) // January 1st
        end = new Date(year, 2, 31) // March 31st
        break
      case 2:
        start = new Date(year, 3, 1) // April 1st
        end = new Date(year, 5, 30) // June 30th
        break
      case 3:
        start = new Date(year, 6, 1) // July 1st
        end = new Date(year, 8, 30) // September 30th
        break
      case 4:
        start = new Date(year, 9, 1) // October 1st
        end = new Date(year, 11, 31) // December 31st
        break
      default:
        return
    }

    setStartDate(start)
    setEndDate(end)

    try {
      const response = await getDateStatistic({
        franchiseId: franchiseInfo ? franchiseInfo?.id.toString() : '',
        startDate: start ? format(start, 'yyyy-MM-dd') : '',
        endDate: end ? format(end, 'yyyy-MM-dd') : '',
      })

      if (response) {
        setStatisticData(response)
      }

      console.log('response', response)
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('An error occurred:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setStatisticData(null)
      return
    }

    try {
      const productResponse = await getDateProductStatistic({
        franchiseId: franchiseInfo ? franchiseInfo?.id.toString() : '',
        startDate: start ? format(start, 'yyyy-MM-dd') : '',
        endDate: end ? format(end, 'yyyy-MM-dd') : '',
      })

      if (productResponse) {
        setProductStatisticData(productResponse)
      }

      console.log('response', productResponse)
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('An error occurred:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setProductStatisticData(null)
      return
    }
  }

  useEffect(() => {
    handleSelectButton('monthly')
  }, [])

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        {/* <TopNav links={topNav} /> */}
        {franchiseInfo?.ui?.logo_image ? (
          <img
            src={franchiseInfo?.ui?.logo_image}
            alt='Logo'
            className='h-10 w-auto'
          />
        ) : null}
        <div className='ml-auto flex items-center space-x-4'>
          <Search />

          {/* <ThemeSwitch /> */}
          <LanguageSwitch />
          <UserNav userInfo={userInfo} />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}

      <Layout.Body>
        <div className='mb-6'>
          <DateSelect
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleSubmitDate={handleSubmitDate}
            handleSubmitQuarter={handleSubmitQuarter}
            selectedButton={selectedButton}
            handleSubmitPeriod={handleSubmitPeriod}
            handleSelectButton={handleSelectButton}
          />
        </div>

        <Tabs
          orientation='vertical'
          defaultValue='sales_status'
          className='space-y-4'
        >
          <div>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <StatisticCard data={statisticData} />
            </div>
          </div>

          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='sales_status'>
                {t('sales_status')}
              </TabsTrigger>
              <TabsTrigger value='product_statistic'>
                {t('product_statistic')}
              </TabsTrigger>
              {/* <TabsTrigger value='analytics'>{t('analytics')}</TabsTrigger> */}
            </TabsList>
          </div>

          <TabsContent value='sales_status' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <div className='flex-row items-center '>
                    <CardTitle>{t('sales_status')}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className='pl-2'>
                  <SalesStatus data={statisticData} />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>{t('recent_sales')}</CardTitle>
                  <CardDescription>
                    {/* {t('recent_sales_desc', {
                      amount: statisticData?.counts?.total_order_count,
                    })} */}
                  </CardDescription>
                </CardHeader>
                <CardContent className='max-h-[350px] overflow-y-scroll'>
                  <RecentSales data={statisticData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='product_statistic' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <div className='flex-row items-center '>
                    <CardTitle>{t('product_statistic')}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className='pl-2'>
                  <ProductStatistic data={productStatisticData} />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>{t('recent_sales')}</CardTitle>
                  <CardDescription>
                    {/* {t('recent_sales_desc', {
                      amount: statisticData?.counts?.total_order_count,
                    })} */}
                  </CardDescription>
                </CardHeader>
                <CardContent className='max-h-[350px] overflow-y-scroll'>
                  <ProductSales data={productStatisticData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}

// const topNav = [
//   {
//     title: 'dashboard.overview',
//     href: 'dashboard/overview',
//     isActive: true,
//   },
//   {
//     title: 'dashboard.customers',
//     href: 'dashboard/customers',
//     isActive: false,
//   },
//   {
//     title: 'dashboard.products',
//     href: 'dashboard/products',
//     isActive: false,
//   },
//   {
//     title: 'dashboard.settings',
//     href: 'dashboard/settings',
//     isActive: false,
//   },
// ]
