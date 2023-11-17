import { ComponentProps, createElement, PropsWithChildren } from 'react'
import { create } from 'zustand'
import { InteractiveAriaImage } from '@/components/InteractiveAriaImage'

type Info = ComponentProps<typeof InteractiveAriaImage>['activeInfo']

type State = {
  activeInfo?: Info
  setActiveInfo: (info: Info) => void
}

const useAriaImageState = create<State>((set) => ({
  activeInfo: undefined,
  setActiveInfo: (info) => set({ activeInfo: info }),
}))

export const ConnectedAriaImage = () => {
  const activeInfo = useAriaImageState((s) => s.activeInfo)
  const setActiveInfo = useAriaImageState((s) => s.setActiveInfo)
  return (
    <InteractiveAriaImage
      activeInfo={activeInfo}
      setActiveInfo={setActiveInfo}
    />
  )
}

export const AriaImageHover = ({
  info,
  children,
  as = 'span',
}: PropsWithChildren<{ info: Info; as?: string }>) => {
  const setActiveInfo = useAriaImageState((s) => s.setActiveInfo)
  return createElement(as, {
    onPointerEnter: () => setActiveInfo(info),
    children,
  })
}
