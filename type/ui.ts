import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export interface LayoutProps {
  children?: React.ReactNode
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface ModalLayoutProps {
  children: React.ReactNode
  closeAction?: Function
  title?: string
}
