import { useRouter } from 'next/router'
import { CreateTeamForm, Modal } from '@/components'

const CreateTeamModal = () => {
  const router = useRouter()
  const { asPath } = router

  const showTeamCreateModal = asPath === '/team/create'
  const closeModal = () => router.push('/team')

  return (
    <Modal
      handleClose={closeModal}
      isOpen={showTeamCreateModal}
      title="회사 등록하기"
    >
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
    </Modal>
  )
}

export default CreateTeamModal
