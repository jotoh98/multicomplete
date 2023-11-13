'use client'
import { useState } from 'react'
import {
  FloatingPortal,
  useFloating,
  useHover,
  useId,
  useInteractions,
} from '@floating-ui/react'

export const FloatingInfo = <TElement extends HTMLElement>(props: {
  children: (props: {
    ref: React.Ref<TElement>
    'aria-describedby': string
  }) => React.ReactNode
  info: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
  })

  const hover = useHover(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const id = useId()
  return (
    <>
      {props.children({
        ref: refs.setReference,
        ...getReferenceProps(),
        'aria-describedby': id,
      })}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className="max-w-md rounded-md bg-black p-2 text-sm text-white shadow-lg"
            style={floatingStyles}
            {...getFloatingProps()}
            id={id}
          >
            {props.info}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
