import { LayoutProps } from '@/type'
import styled from 'styled-components'
import tw from 'twin.macro'
import { XIcon } from '@heroicons/react/outline'

export const Modal = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}

const ModalBackground = styled.div`
  ${tw`fixed inset-0 z-[21] flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none`}
`
interface ContentProps {
  size?: 'small' | 'medium' | 'large'
}
const ModalContainer = styled.div<ContentProps>`
  ${tw`relative my-6    bg-white rounded-lg`}
  ${(props) =>
    props.size === 'small'
      ? tw`w-auto w-10/12 sm:max-w-[50%] lg:max-w-[30%]`
      : tw`mx-auto sm:my-8 w-11/12 sm:max-w-screen-lg`}
`
const ModalContent = styled.div`
  ${tw`relative flex w-full flex-col rounded-lg border-0 bg-white shadow-xl outline-none focus:outline-none`}
`
const ModalHeader = styled.div`
  ${tw`border-gray-200 p-5`}
`
const ModalTitle = styled.h3`
  ${tw`text-lg font-medium leading-6 text-gray-900`}
`
const ModalBody = styled.div`
  ${tw`relative flex-auto p-5 sm:p-6 sm:pb-4 text-sm text-gray-600`}
`
const ModalFooter = styled.div`
  ${tw`flex items-center justify-end rounded-b  py-3 px-5`}
`
const ModalBackArea = styled.div`
  ${tw`fixed inset-0 z-[20] bg-black opacity-25`}
`
const ModalCloseButton = styled.button`
  ${tw`absolute top-4 right-4 hover:border-2 hover:border-blue-300 hover:rounded`}
`
interface CloseButtonProps {
  className?: string
  name?: string
  onClick: () => void
}

const CloseButton = ({ className, name, onClick }: CloseButtonProps) => {
  return (
    <ModalCloseButton
      aria-label="close"
      className={className}
      name={name}
      onClick={onClick}
    >
      <XIcon className="h-6 w-6" />
    </ModalCloseButton>
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
