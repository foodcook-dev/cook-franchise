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
// import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import ThemeSwitch from '@/components/theme-switch'
// import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { RecentSales } from './components/recent-sales'

import { useTranslations } from 'use-intl'
// import LanguageSwitch from '@/components/language-switch'
// import { ProductChart } from './components/product-chart'
// import { ProductSales } from './components/product-sales'

// import { productColumns } from './components/product-columns'

import { DateSelect } from '@/components/ui/date-select'
import { useEffect, useState } from 'react'
import {
  getDateFranchiseProductStatistic,
  getDateFranchiseRevenueStatistic,
  getDateFranchiseSalesCompanyStatistic,
} from '@/controller/statistic'
import { StatisticCard } from './components/statistic-card'
import {
  DateSalesCompanyStatisticData,
  DateStatisticData,
  pieChartData,
} from '@/types/product'
import { SalesStatus } from './components/sales-status'
import { useToast } from '@/components/ui/use-toast'
import { Franchise } from '@/types/users'
import { ProductStatistic } from './components/product-statistic'
import { ProductSales } from './components/product-sales'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
import FranchiseSelect from '@/components/common/FranchiseSelect'
// import { getFranchiseList, getStoreList } from '@/controller/franchise'
import useAppStore from '@/stores/store'

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
    useState<pieChartData | null>(null)

  const [salesCompanyStatisticData, setSalesCompanyStatisticData] =
    useState<DateSalesCompanyStatisticData | null>(null)

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const [selectedButton, setSelectedButton] = useState<string | null>(null)

  // new franchise api
  // const [franchiseList, setFranchiseList] = useState<[]>([])
  const selectedFranchise = useAppStore((state) => state.selectedFranchise)
  // const setSelectedFranchise = useAppStore(
  //   (state) => state.setSelectedFranchise
  // )
  const selectedStore = useAppStore((state) => state.selectedStore)
  // const setSelectedStore = useAppStore((state) => state.setSelectedStore)
  // const [storeList, setStoreList] = useState<[]>([])

  const handleSelectButton = (value: string) => {
    setSelectedButton(value)

    if (['daily', 'weekly', 'monthly'].includes(value)) {
      handleSubmitPeriod &&
        handleSubmitPeriod(value as 'daily' | 'weekly' | 'monthly')
    } else if (['1', '2', '3', '4'].includes(value)) {
      handleSubmitQuarter && handleSubmitQuarter(Number(value) as 1 | 2 | 3 | 4)
    }
  }

  const handleSubmitDate = async ({
    franchiseId,
    storeInfo,
  }: {
    franchiseId?: string | null
    storeInfo?: { id: string; name: string } | null
  }) => {
    const yesterday = addDays(new Date(), -1)
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

    if (endDate > yesterday) {
      alert('오늘 날짜 기준 하루 전까지 검색 가능합니다.')
      return
    }

    setSelectedButton(null)

    try {
      const response = await getDateFranchiseRevenueStatistic({
        franchiseId:
          franchiseId && franchiseId === 'all'
            ? ''
            : franchiseId && franchiseId !== 'all'
              ? franchiseId
              : selectedFranchise
                ? selectedFranchise?.id
                : '',

        sales_company_id:
          franchiseId && franchiseId === 'all'
            ? ''
            : storeInfo && storeInfo?.id === 'all'
              ? ''
              : storeInfo && storeInfo?.id !== 'all'
                ? storeInfo?.id
                : !storeInfo
                  ? null
                  : selectedStore
                    ? selectedStore?.id
                    : '',

        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
      })

      if (response) {
        setStatisticData(response)
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('에러:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setStatisticData(null)
      // return
    }

    try {
      const productResponse = await getDateFranchiseProductStatistic({
        franchiseId:
          franchiseId && franchiseId === 'all'
            ? ''
            : franchiseId && franchiseId !== 'all'
              ? franchiseId
              : selectedFranchise
                ? selectedFranchise?.id
                : '',

        sales_company_id:
          franchiseId && franchiseId === 'all'
            ? ''
            : storeInfo && storeInfo?.id === 'all'
              ? ''
              : storeInfo && storeInfo?.id !== 'all'
                ? storeInfo?.id
                : !storeInfo
                  ? null
                  : selectedStore
                    ? selectedStore?.id
                    : '',

        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
      })

      if (productResponse) {
        setProductStatisticData(productResponse)
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('에러:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setProductStatisticData(null)
      // return
    }

    try {
      const response = await getDateFranchiseSalesCompanyStatistic({
        franchiseId:
          franchiseId && franchiseId === 'all'
            ? franchiseInfo?.id?.toString()
            : franchiseId && franchiseId !== 'all'
              ? franchiseId
              : selectedFranchise
                ? selectedFranchise?.id
                : '',

        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
      })

      if (response) {
        setSalesCompanyStatisticData(response)
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('에러:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setSalesCompanyStatisticData(null)
      // return
    }
  }

  const handleSubmitPeriod = async (period: 'daily' | 'weekly' | 'monthly') => {
    const today = new Date()
    const yesterday = addDays(new Date(), -1)

    let newStartDate: Date | undefined
    let newEndDate: Date | undefined

    switch (period) {
      case 'daily':
        newStartDate = addDays(today, -1)
        newEndDate = yesterday
        break

      case 'weekly':
        newStartDate = startOfWeek(yesterday)
        newEndDate = yesterday
        // newEndDate = endOfWeek(yesterday)

        break

      case 'monthly':
        newStartDate = startOfMonth(yesterday)
        newEndDate = yesterday
        // newEndDate = endOfMonth(yesterday)

        break

      default:
        break
    }

    // 상태 업데이트
    setStartDate(newStartDate)
    setEndDate(newEndDate)

    try {
      const response = await getDateFranchiseRevenueStatistic({
        franchiseId: selectedFranchise ? selectedFranchise?.id : '',
        sales_company_id: selectedStore ? selectedStore?.id : '',
        startDate: newStartDate ? format(newStartDate, 'yyyy-MM-dd') : '',
        endDate: newEndDate ? format(newEndDate, 'yyyy-MM-dd') : '',
      })
      if (response) {
        setStatisticData(response)
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('에러:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setStatisticData(null)
      return
    }

    try {
      const productResponse = await getDateFranchiseProductStatistic({
        franchiseId: selectedFranchise ? selectedFranchise?.id : '',
        sales_company_id: selectedStore ? selectedStore?.id : '',
        startDate: newStartDate ? format(newStartDate, 'yyyy-MM-dd') : '',
        endDate: newEndDate ? format(newEndDate, 'yyyy-MM-dd') : '',
      })

      if (productResponse) {
        setProductStatisticData(productResponse)
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('에러:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setProductStatisticData(null)
      return
    }

    try {
      const response = await getDateFranchiseSalesCompanyStatistic({
        franchiseId: selectedFranchise
          ? selectedFranchise?.id
          : franchiseInfo?.id?.toString(),

        startDate: newStartDate ? format(newStartDate, 'yyyy-MM-dd') : '',
        endDate: newEndDate ? format(newEndDate, 'yyyy-MM-dd') : '',
      })

      if (response) {
        setSalesCompanyStatisticData(response)
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('에러:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setSalesCompanyStatisticData(null)
      // return
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
      const response = await getDateFranchiseRevenueStatistic({
        franchiseId: selectedFranchise ? selectedFranchise?.id : '',
        sales_company_id: selectedStore ? selectedStore?.id : '',
        startDate: start ? format(start, 'yyyy-MM-dd') : '',
        endDate: end ? format(end, 'yyyy-MM-dd') : '',
      })

      if (response) {
        setStatisticData(response)
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('에러:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setStatisticData(null)
      // return
    }

    try {
      const productResponse = await getDateFranchiseProductStatistic({
        franchiseId: selectedFranchise ? selectedFranchise?.id : '',
        sales_company_id: selectedStore ? selectedStore?.id : '',
        startDate: start ? format(start, 'yyyy-MM-dd') : '',
        endDate: end ? format(end, 'yyyy-MM-dd') : '',
      })

      if (productResponse) {
        setProductStatisticData(productResponse)
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('에러:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setProductStatisticData(null)
      // return
    }

    try {
      const response = await getDateFranchiseSalesCompanyStatistic({
        franchiseId: selectedFranchise
          ? selectedFranchise?.id
          : franchiseInfo?.id?.toString(),

        startDate: start ? format(start, 'yyyy-MM-dd') : '',
        endDate: end ? format(end, 'yyyy-MM-dd') : '',
      })

      if (response) {
        setSalesCompanyStatisticData(response)
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status: number
          data: { detail: string }
        }
      }
      console.error('에러:', err?.response?.data.detail)
      toast({
        variant: 'destructive',
        description: err?.response?.data.detail,
      })

      setSalesCompanyStatisticData(null)
      // return
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

        <FranchiseSelect handleSubmitDate={handleSubmitDate} />

        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search /> */}

          {/* <ThemeSwitch /> */}
          {/* <LanguageSwitch /> */}
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
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
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

              <TabsTrigger value='sales_company_statistic'>
                {t('sales_company_statistic')}
              </TabsTrigger>
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
                </CardHeader>
                <CardContent className='max-h-[350px] overflow-y-scroll'>
                  <RecentSales data={statisticData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='product_statistic' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <div className='flex-row items-center '>
                    <CardTitle>{t('product_statistic')}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className='pl-2'>
                  <ProductStatistic data={productStatisticData} />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>{t('product_sales_ranking')}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className='max-h-[500px] overflow-y-scroll'>
                  <ProductSales data={productStatisticData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='sales_company_statistic' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              {/* <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <div className='flex-row items-center '>
                    <CardTitle>{t('sales_company_statistic')}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className='pl-2'>
                  <ProductStatistic data={productStatisticData} />
                </CardContent>
              </Card> */}
              <Card className='col-span-1 lg:col-span-7'>
                <CardHeader>
                  <CardTitle>{t('sales_company_statistic')}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className='max-h-[500px] overflow-y-scroll'>
                  <ProductSales data={salesCompanyStatisticData} />
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
