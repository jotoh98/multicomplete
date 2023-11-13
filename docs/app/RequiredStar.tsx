'use client'
import { FloatingInfo } from '@/app/FloatingInfo'

export const RequiredStar = () => (
  <FloatingInfo info="This property is required">
    {(p) => (
      <span {...p} className="cursor-help text-red-500">
        *
      </span>
    )}
  </FloatingInfo>
)
