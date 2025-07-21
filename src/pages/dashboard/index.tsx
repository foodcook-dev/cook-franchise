import { Layout } from '@/components/custom/layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { UserNav } from '@/components/user-nav'
import { RecentSales } from './components/recent-sales'

import { useTranslations } from 'use-intl'

import { DateSelect } from '@/components/ui/date-select'
import { useEffect } from 'react'

import { StatisticCard } from './components/statistic-card'
import { SalesStatus } from './components/sales-status'
import { useToast } from '@/components/ui/use-toast'
import { Franchise } from '@/types/users'
import { ProductStatistic } from './components/product-statistic'
import { ProductSales } from './components/product-sales'
import FranchiseSelect from '@/components/common/FranchiseSelect'
import useAppStore from '@/stores/store'
import {
  useProductStatistic,
  useRevenueStatistic,
  useSalesCompanyStatistic,
} from '@/hooks/useDashboardStatistics'
import { useDateSelection } from '@/hooks/useDateSelection'
import { resolveIds } from '@/utils/format'

export default function Dashboard() {
  const t = useTranslations('dashboard')
  const { toast } = useToast()
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const franchiseInfoString = localStorage.getItem('franchiseInfo')
  const franchiseInfo: Franchise = franchiseInfoString
    ? JSON.parse(franchiseInfoString)
    : null

  // state
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    selectedButton,
    setSelectedButton,
    setDatesByPeriod,
    setDatesByQuarter,
    validateDateRange,
  } = useDateSelection()

  const selectedFranchise = useAppStore((state) => state.selectedFranchise)
  const selectedStore = useAppStore((state) => state.selectedStore)

  // Get effective IDs based on selected filters
  const { franchiseId, storeId } = resolveIds({
    franchiseId: franchiseInfo?.id,
    selectedFranchise,
    selectedStore,
    franchiseInfo,
  })

  // 통계 데이터 쿼리
  const {
    data: statisticData,
    isError: isRevenueError,
    error: revenueError,
    refetch: refetchRevenue,
  } = useRevenueStatistic({
    franchiseId,
    storeId,
    startDate: startDate || new Date(),
    endDate: endDate || new Date(),
  })

  const {
    data: productStatisticData,
    isError: isProductError,
    error: productError,
    refetch: refetchProduct,
  } = useProductStatistic({
    franchiseId,
    storeId,
    startDate: startDate || new Date(),
    endDate: endDate || new Date(),
  })

  const {
    data: salesCompanyStatisticData,
    isError: isSalesCompanyError,
    error: salesCompanyError,
    refetch: refetchSalesCompany,
  } = useSalesCompanyStatistic({
    franchiseId,
    startDate: startDate || new Date(),
    endDate: endDate || new Date(),
  })

  // Error handling
  useEffect(() => {
    const errors = [
      { error: revenueError, isError: isRevenueError },
      { error: productError, isError: isProductError },
      { error: salesCompanyError, isError: isSalesCompanyError },
    ]

    errors.forEach(({ error, isError }) => {
      if (isError && error) {
        const err = error as { response?: { data: { detail: string } } }
        toast({
          variant: 'destructive',
          description: err?.response?.data?.detail || 'An error occurred',
        })
      }
    })
  }, [
    isRevenueError,
    isProductError,
    isSalesCompanyError,
    toast,
    revenueError,
    productError,
    salesCompanyError,
  ])

  // 모든 데이터 다시 불러오기
  const refetchAllData = () => {
    refetchRevenue()
    refetchProduct()
    refetchSalesCompany()
  }

  // 버튼 선택 처리
  const handleSelectButton = (value: string) => {
    if (['daily', 'weekly', 'monthly'].includes(value)) {
      setDatesByPeriod(value as 'daily' | 'weekly' | 'monthly')
    } else if (['1', '2', '3', '4'].includes(value)) {
      setDatesByQuarter(Number(value))
    }

    // 날짜 변경 후 데이터 다시 불러오기
    setTimeout(refetchAllData, 0)
  }

  // 날짜 선택 제출 처리
  const handleSubmitDate = () => {
    // 날짜 유효성 검사
    const validation = validateDateRange()
    if (!validation.valid) {
      alert(validation.message)
      return
    }

    setSelectedButton(null)

    // ID 확인 후 데이터 다시 불러오기
    setTimeout(refetchAllData, 0)
  }

  // 초기 로딩
  useEffect(() => {
    handleSelectButton('monthly')
  }, [])

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
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
            selectedButton={selectedButton}
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
              <StatisticCard data={statisticData} isError={isRevenueError} />
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
                  <SalesStatus data={statisticData} isError={isRevenueError} />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>{t('recent_sales')}</CardTitle>
                </CardHeader>
                <CardContent className='max-h-[350px] overflow-y-scroll'>
                  <RecentSales data={statisticData} isError={isRevenueError} />
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
                  <ProductStatistic
                    data={productStatisticData}
                    isError={isProductError}
                  />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>{t('product_sales_ranking')}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className='max-h-[500px] overflow-y-scroll'>
                  <ProductSales
                    data={productStatisticData}
                    isError={isProductError}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='sales_company_statistic' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-7'>
                <CardHeader>
                  <CardTitle>{t('sales_company_statistic')}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className='max-h-[500px] overflow-y-scroll'>
                  <ProductSales
                    data={salesCompanyStatisticData}
                    isError={isSalesCompanyError}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
