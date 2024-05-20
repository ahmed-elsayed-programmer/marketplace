import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'


type MaxWidthWrapperProps = {
  className?: string,
  children: ReactNode
}
const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(className, "mx-auto w-full max-w-screen-xl px-2.5 md:px-20")}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper