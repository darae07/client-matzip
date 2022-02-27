import React, { FC, useEffect, useRef } from 'react'
import { LayoutProps } from 'type/ui'
import lottie from 'lottie-web'

export default function AuthLayout({ children }: LayoutProps) {
  const animation = useRef()
  useEffect(() => {
    lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('public/animation/41570-time-relax-lunch.json'),
    })
  }, [])
  return (
    <div className="mx-auto flex h-screen w-fit items-center justify-self-center">
      <div className="w-full max-w-[28rem] items-center p-10">
        <div className="mx-auto">
          <h1>오늘뭐먹지?</h1>
          <h1 className="mb-4 text-3xl font-bold">
            쉽고 빠른 점심메뉴 의사결정
          </h1>
          {children}
        </div>
      </div>

      <div className="hidden w-full max-w-[35rem] items-center  md:flex">
        <div ref={animation}></div>
      </div>
    </div>
  )
}
