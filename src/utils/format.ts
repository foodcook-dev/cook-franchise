import { Franchise } from '@/types/users'

type Store = {
  id: string | number
  name: string
}

const formatPrice = (price: number | string | undefined) => {
  if (!price) {
    return '0'
  }
  if (typeof price === 'string') {
    price = parseInt(price)
  }
  return price.toLocaleString()
}

function resolveIds({
  franchiseId,
  storeInfo,
  selectedFranchise,
  selectedStore,
  franchiseInfo,
}: {
  franchiseId?: string | number | null | undefined
  storeInfo?: Store | null
  selectedFranchise: Franchise | Store | null
  selectedStore?: Store | null
  franchiseInfo?: Franchise | null
}) {
  // franchiseId 결정
  // console.log('franchiseId:', franchiseId)
  // console.log('selectedStore:', selectedStore)
  const resolvedFranchiseId = selectedFranchise ? selectedFranchise?.id : ''

  // storeId 결정
  const resolvedStoreId = storeInfo
    ? storeInfo?.id
    : selectedStore
      ? selectedStore?.id
      : ''

  // salesCompany용 franchiseId 결정 (특별 케이스)
  const salesCompanyFranchiseId =
    franchiseId && franchiseId === 'all'
      ? franchiseInfo?.id?.toString()
      : franchiseId && franchiseId !== 'all'
        ? franchiseId
        : selectedFranchise
          ? selectedFranchise?.id
          : ''

  return {
    franchiseId: resolvedFranchiseId,
    storeId: resolvedStoreId,
    salesCompanyFranchiseId,
  }
}

export { formatPrice, resolveIds }
