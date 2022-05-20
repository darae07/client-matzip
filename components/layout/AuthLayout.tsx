import React, { FC, useEffect, useRef } from 'react'
import { LayoutProps } from 'type/ui'
// import lottie from 'lottie-web'
import OurMatzipLogo from '@/public/icon/our_matzip_logo.svg'

export default function AuthLayout({ children }: LayoutProps) {
  const animation = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (animation.current) {
      // lottie.loadAnimation({
      //   container: animation.current,
      //   renderer: 'svg',
      //   loop: true,
      //   autoplay: true,
      //   animationData: require('public/animation/41570-time-relax-lunch.json'),
      // })
    }
  }, [])
  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <div className="w-full max-w-[28rem] items-center p-10">
        <div className="mx-auto">
          <OurMatzipLogo width={160} />

          <h1 className="mb-6 mt-1 text-3xl font-bold">
            쉽고 빠른 점심메뉴 의사결정
          </h1>
          {children}
        </div>
      </div>

      {/* <div className="hidden w-full max-w-[35rem] items-center  md:flex">
        <div ref={animation}></div>
      </div> */}
    </div>
  )
}
