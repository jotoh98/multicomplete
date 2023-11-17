'use client'
import { FloatingInfo } from '@/components/FloatingInfo'

export const MoreInfo = (props: {
  children: React.ReactNode
  className: string
  info: React.ReactNode
  href: string
}) => (
  <FloatingInfo<HTMLAnchorElement> info={props.info}>
    {(p) => (
      <a
        {...p}
        href={props.href}
        className={
          props.className + ' cursor-pointer underline decoration-dashed'
        }
      >
        {props.children}
      </a>
    )}
  </FloatingInfo>
)
