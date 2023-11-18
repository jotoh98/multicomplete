import { PropsWithChildren, useEffect, useState } from 'react'

export const NoSSR = (props: PropsWithChildren) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return isVisible ? props.children : null
}
