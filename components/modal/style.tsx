import { LayoutProps } from '@/type'
import styled from 'styled-components'
import tw from 'twin.macro'
import classNames from 'classnames'
import { CloseButton as CloseBtn } from '@/components'

export const Modal = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}

const ModalBackground = styled.div`
  ${tw`fixed inset-0 z-[21] px-4 flex items-center justify-center overflow-y-hidden overflow-x-hidden outline-none focus:outline-none`}
`
export interface ContentSize {
  size?: 'small' | 'medium' | 'large'
}
const ModalContainer = styled.div<ContentSize>`
  ${tw`relative my-8  bg-white rounded-2xl p-6`}
  ${(props) =>
    props.size === 'small'
      ? tw`w-full sm:max-w-[50%] lg:max-w-[30%]`
      : props.size === 'large'
      ? tw`mx-auto w-full max-w-screen-xl`
      : tw`mx-auto w-full max-w-screen-md`}
`
const ModalContent = styled.div`
  ${tw`relative flex w-full flex-col rounded-lg border-0 bg-white shadow-xl outline-none focus:outline-none`}
`
const ModalHeader = styled.div`
  ${tw`border-gray-200`}
`
const ModalTitle = styled.h3`
  ${tw`text-lg font-medium leading-6 text-gray-900`}
`
const ModalBody = styled.div`
  ${tw`relative flex-auto text-sm text-gray-600 overflow-y-auto`}
`
const ModalFooter = styled.div`
  ${tw`flex items-center justify-end rounded-b pt-3`}
`
const ModalBackArea = styled.div`
  ${tw`fixed inset-0 z-[20] bg-black opacity-25`}
`
const ModalCloseButton = styled.button`
  ${tw`absolute right-6 top-6 text-gray-400 z-[29]`}
`
interface CloseButtonProps {
  className?: string
  name?: string
  onClick: () => void
}

const CloseButton = ({ className, name, onClick }: CloseButtonProps) => {
  return (
    <CloseBtn
      className={classNames(
        className,
        'absolute right-6 top-6 z-[29] text-gray-400',
      )}
      name={name}
      onClick={onClick}
    />
  )
}
Modal.Background = ModalBackground
Modal.Container = ModalContainer
Modal.Content = ModalContent
Modal.Header = ModalHeader
Modal.Title = ModalTitle
Modal.Body = ModalBody
Modal.Footer = ModalFooter
Modal.BackArea = ModalBackArea
Modal.CloseButton = CloseButton
