import { getFranchiseList, getStoreList } from '@/controller/franchise'
import useAppStore from '@/stores/store'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type FranchiseSelectProps = {
  isAllSelected?: boolean
  storeShow?: boolean
  handleSubmitDate?: ({
    franchiseId,
    storeInfo,
  }: {
    franchiseId?: string | null | undefined
    storeInfo?: { id: string; name: string } | null
  }) => void
}

export default function FranchiseSelect({
  isAllSelected = true,
  storeShow = true,
  handleSubmitDate,
}: FranchiseSelectProps) {
  const { toast } = useToast()
  const [franchiseList, setFranchiseList] = useState<[]>([])
  const [storeList, setStoreList] = useState<[]>([])

  const selectedFranchise = useAppStore((state) => state.selectedFranchise)
  const setSelectedFranchise = useAppStore(
    (state) => state.setSelectedFranchise
  )
  const selectedStore = useAppStore((state) => state.selectedStore)
  const setSelectedStore = useAppStore((state) => state.setSelectedStore)

  const fetchFranchiseList = async () => {
    try {
      const response = await getFranchiseList()
      if (response) {
        setFranchiseList(response?.franchises)
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
    }
  }

  const handleFranchiseChange = async (franchiseId: string) => {
    if (franchiseId === 'all') {
      setSelectedFranchise(null)
      setStoreList([])
      setSelectedStore(null)
      handleSubmitDate &&
        handleSubmitDate({ franchiseId: 'all', storeInfo: null })
      return
    }

    const selected = franchiseList?.find(
      (franchise: { id: number }) => franchise.id.toString() === franchiseId
    )

    // console.log('selected:', selected)

    if (selected) {
      setSelectedFranchise(selected)
      setSelectedStore(null)
      handleSubmitDate &&
        handleSubmitDate({ franchiseId: franchiseId, storeInfo: null })
    }
    const result = await getStoreList(franchiseId)

    if (result) {
      setStoreList(result?.sales_companies)
    }
  }

  const handleStoreChange = async (storeId: string) => {
    // console.log('storeId:', storeId)
    if (storeId === 'all') {
      setSelectedStore(null)
      handleSubmitDate &&
        handleSubmitDate({
          franchiseId: selectedFranchise?.id,
          storeInfo: { id: 'all', name: '전체' },
        })
      return
    }

    const selected = storeList?.find(
      (store: { id: number }) => store.id.toString() === storeId
    )
    // console.log('selected:', selected)
    if (selected) {
      setSelectedStore(selected)
      if (handleSubmitDate) {
        handleSubmitDate({ storeInfo: selected })
      }
    }
  }

  useEffect(() => {
    fetchFranchiseList()
  }, [])

  useEffect(() => {
    if (selectedFranchise) {
      handleFranchiseChange(selectedFranchise.id.toString())
    }
  }, [])

  useEffect(() => {
    if (selectedStore) {
      handleStoreChange(selectedStore.id.toString())
    }
  }, [])

  return (
    <>
      <Select
        onValueChange={handleFranchiseChange}
        value={selectedFranchise?.id.toString() ?? ''}
      >
        <SelectTrigger
          className={`${isAllSelected ? 'w-[180px]' : 'w-[200px]'} `}
        >
          {isAllSelected ? (
            <SelectValue placeholder={'프랜차이즈 선택'} />
          ) : (
            <SelectValue placeholder={'프랜차이즈를 선택해주세요'} />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>프랜차이즈 선택</SelectLabel> */}
            <SelectItem key={'all'} value='all'>
              {isAllSelected ? '전체' : '선택'}
            </SelectItem>
            {franchiseList?.map((franchise: { id: number; name: string }) => (
              <SelectItem key={franchise.id} value={franchise.id.toString()}>
                {franchise.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {storeShow && (
        <Select
          onValueChange={handleStoreChange}
          value={selectedStore?.id.toString() ?? ''}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder={'가맹점 선택'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>가맹점 선택</SelectLabel> */}
              <SelectItem key={'all'} value='all'>
                전체
              </SelectItem>

              {storeList?.map((store: { id: number; name: string }) => (
                <SelectItem key={store.id} value={store.id.toString()}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  )
}
