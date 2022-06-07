import { useState } from 'react'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
  Modal,
  GoodButton,
  Form,
  FormTextarea,
  FormFileInput,
} from '@/components'
import { ApiResponseData, Party, ReviewCreateValue } from '@/type'
import classNames from 'classnames'
import { useMutationHandleError } from '@/utils/hooks'
import { closeParty, closePartyWithReview } from '@/api'
import { openToast } from '@/components/toast'
import { useQueryClient } from 'react-query'

interface ReviewModalProps {
  isOpen: boolean
  setOpen: Function
  domain: 'party' | 'lunch'
}

const reviewValues: ReviewCreateValue = {
  content: '',
  image: [],
}

export const EatModal = ({ isOpen, setOpen, domain }: ReviewModalProps) => {
  const closeModal = () => setOpen(false)
  const [isGood, setIsGood] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { query } = useRouter()
  const { id } = query

  const createReviewSchema = Yup.object().shape({})
  const handleCreateReview = (values: ReviewCreateValue) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    if (isGood) {
      const formData = new FormData()
      formData.append('content', values.content)
      values.image.forEach((img) => formData.append('image', img))
      if (domain === 'party')
        closePartyWithReviewMutation.mutate({ id, data: formData })
    } else {
      if (domain === 'party') closePartyMutation.mutate(id)
    }
  }

  const queryClient = useQueryClient()
  const closePartyMutation = useMutationHandleError(
    closeParty,
    {
      onSuccess: (data: ApiResponseData<Party>) => {
        const { message, result } = data
        openToast(message || '식사 완료 기록을 생성했습니다.')
        queryClient.invalidateQueries('partyItem')
        closeModal()
      },
      onSettled: (data: ApiResponseData<Party>) => {
        setIsSubmitting(false)
      },
    },
    '식사 완료 기록을 생성할 수 없습니다.',
  )
  const closePartyWithReviewMutation = useMutationHandleError(
    closePartyWithReview,
    {
      onSuccess: (data: ApiResponseData<Party>) => {
        const { message, result } = data
        openToast(message || '식사 리뷰를 등록했습니다.')
        queryClient.invalidateQueries('partyItem')
        closeModal()
      },
      onSettled: (data: ApiResponseData<Party>) => {
        setIsSubmitting(false)
      },
    },
    '식사 리뷰를 등록할 수 없습니다.',
  )

  return (
    <Modal handleClose={closeModal} isOpen={isOpen} title="식사는 어떠셨나요?">
      <div className="mt-4 flex flex-col items-center">
        <GoodButton isGood={isGood} setIsGood={setIsGood} />
        <div className={classNames('mt-6 w-3/4', { hidden: !isGood })}>
          <p className="mb-2">
            맛있으셨나요? 동료들에게 추천 메시지를 남겨주세요
          </p>
          <Form<ReviewCreateValue>
            onSubmit={handleCreateReview}
            options={{
              resolver: yupResolver(createReviewSchema),
              defaultValues: reviewValues,
            }}
          >
            <FormTextarea<ReviewCreateValue>
              name="content"
              placeholder="코멘트를 남겨주세요"
            />
            <FormFileInput<ReviewCreateValue>
              name="image"
              accept={{
                'image/jpeg': ['.jpeg', '.png', '.jpg'],
              }}
              mode="append"
              className="mt-3"
            />
            <input
              type="submit"
              id="submitForm"
              className="hidden"
              disabled={isSubmitting}
            />
          </Form>
        </div>

        <div className="mt-8 w-full">
          <label
            aria-disabled={isSubmitting}
            htmlFor="submitForm"
            className={classNames(
              'block w-full rounded bg-pink-500 p-2 px-3 text-center text-white',
              { 'bg-gray-500': isSubmitting },
            )}
          >
            먹었어요
          </label>
        </div>
      </div>
    </Modal>
  )
}