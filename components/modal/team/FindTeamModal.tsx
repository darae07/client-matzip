import { FindTeamForm } from 'components/forms/team/FindTeamForm'
import { useRouter } from 'next/router'
import { useState } from 'react'
import PageModal from '../PageModal'

const FindTeamModal = () => {
  const router = useRouter()
  const closeModal = () => {
    router.push('/team')
  }
  const [step, setStep] = useState(1)

  return (
    <PageModal closeAction={closeModal} title="회사 합류하기">
      {step === 1 && (
        <div className="mt-2 justify-between md:flex">
          <p className="mb-4 text-sm text-gray-700">
            동료에게 공유받은 입장코드를 입력해주세요
          </p>
          <FindTeamForm />
        </div>
      )}
    </PageModal>
  )
}

export default FindTeamModal
