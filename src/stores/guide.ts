import { create } from 'zustand'
import { ReactNode } from 'react'

type GuideStep = {
  target: string
  content: string | ReactNode
}

interface GuideState {
  run: boolean
  steps: GuideStep[]
  setRun: (run: boolean) => void
  setSteps: (steps: GuideStep[]) => void
  resetSteps: () => void
}

const useGuideStore = create<GuideState>((set) => ({
  run: false,
  steps: [],
  setRun: (run) => set({ run }),
  setSteps: (steps) => set({ steps, run: true }),
  resetSteps: () => set({ steps: [], run: false }),
}))

export default useGuideStore
