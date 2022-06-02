import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Modal, GoodButton, Form, FormInput } from '@/components'

interface ReviewModalProps {
  isOpen: boolean
  setOpen: Function
  domain: string
}
type ReviewCreateValue = {
  content: string
  image: File
}
export const ReviewModal = ({ isOpen, setOpen, domain }: ReviewModalProps) => {
  const closeModal = () => setOpen(false)
  const [isGood, setIsGood] = useState(false)

  const createReviewSchema = Yup.object().shape({})
  const handleCreateReview = (values: ReviewCreateValue) => {}

  return (
    <Modal handleClose={closeModal} isOpen={isOpen} title="식사는 어떠셨나요?">
      <div className="mt-4 flex flex-col items-center">
        <GoodButton isGood={isGood} setIsGood={setIsGood} />
        <div className="mt-6 w-3/4">
          <p className="mb-2">
            맛있으셨나요? 동료들에게 추천 메시지를 남겨주세요
          </p>
          <Form<ReviewCreateValue>
            onSubmit={handleCreateReview}
            options={{
              resolver: yupResolver(createReviewSchema),
              mode: 'onBlur',
            }}
          >
            <FormInput<ReviewCreateValue>
              name="content"
              placeholder="코멘트를 남겨주세요"
            />
          </Form>
        </div>
        <div className="mt-4 w-full">
          <button className="w-full rounded bg-pink-500 p-2 px-3 text-white">
            먹었어요
          </button>
        </div>
      </div>
    </Modal>
  )
}
