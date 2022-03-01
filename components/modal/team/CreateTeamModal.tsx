import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { CreateTeamForm } from 'components/forms/team/CreateTeamForm'
import { XIcon } from '@heroicons/react/outline'

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
              <button
                type="button"
                className="absolute right-6 text-gray-400"
                onClick={closeModal}
              >
                <XIcon className="h-6 w-6" />
              </button>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                회사 등록하기
              </Dialog.Title>

              <div className="mt-2 justify-between md:flex">
                <p className="mb-4 text-sm text-gray-700">
                  동료들이 알아볼 수 있도록 회사 이름을 알려주세요.
                  <br /> 위치를 동까지만 알려주세요. (예시: 역삼동)
                  <br />
                  <br />
                  등록시 발급되는 입장 코드로 동료들을 초대해 보세요.
                </p>
                <CreateTeamForm />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CreateTeamModal
