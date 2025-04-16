import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Franchise = {
  id: string
  name: string
  headquarters_address: string | null
  contact_email: string | null
  contact_phone: null
}

type Store = {
  id: string
  name: string
}

interface MyStoreState {
  selectedFranchise: Franchise | null
  selectedStore: Store | null
  setSelectedFranchise: (franchise: Franchise | null) => void
  setSelectedStore: (store: Store | null) => void
  reset: () => void
}

const useAppStore = create<MyStoreState>()(
  persist(
    (set) => ({
      selectedFranchise: null,
      selectedStore: null,
      setSelectedFranchise: (franchise) =>
        set({ selectedFranchise: franchise }),
      setSelectedStore: (store) => set({ selectedStore: store }),
      reset: () =>
        set({
          selectedFranchise: null,
          selectedStore: null,
        }),
    }),
    {
      name: 'franchise-selected-values',
    }
  )
)

export default useAppStore
