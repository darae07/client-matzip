import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const CreateTeamModal = () => {
  const router = useRouter()
  const closeModal = () => router.push('/team')

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[21] overflow-y-auto "
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                회사 등록하기
              </Dialog.Title>
              <div className="mt-2 flex">
                <p className="text-sm text-gray-500">
                  회사 이름과 위치(00동까지)를 알려주세요. <br /> 등록시
                  발급되는 입장 코드로 동료들을 초대해 보세요. <br />
                  매일 점심, 동료들과 간편하게 메뉴를 결정해 보세요.
                </p>
                <div>이름</div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CreateTeamModal
