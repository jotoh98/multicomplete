import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { PropsWithChildren } from 'react'
import { Tabs } from 'nextra/components'

type State = {
  activeTab: number
  setActiveTab: (activeTab: number) => void
}

const usePackageManager = create<State>()(
  persist(
    (set) => ({
      activeTab: 0,
      setActiveTab: (activeTab) => set({ activeTab }),
    }),
    {
      name: 'package-manager',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const PackageManagerTabs = (props: PropsWithChildren) => {
  const activeTab = usePackageManager((s) => s.activeTab)
  const setActiveTab = usePackageManager((s) => s.setActiveTab)
  return (
    <Tabs
      items={['npm', 'yarn', 'pnpm', 'bun']}
      selectedIndex={activeTab}
      onChange={setActiveTab}
    >
      {props.children}
    </Tabs>
  )
}

export const Tab = Tabs.Tab
