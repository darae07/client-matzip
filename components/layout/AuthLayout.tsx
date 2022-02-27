import React, { FC } from 'react'
import { LayoutProps } from 'type/ui'

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-self-center">
      <div className="w-full max-w-[28rem] items-center p-10">{children}</div>
      <div className="hidden items-center p-28 md:flex md:w-1/2">
        이미지 영역
      </div>
    </div>
  )
}
