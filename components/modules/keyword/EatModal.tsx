import { useState } from 'react'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
  Modal,
  Form,
  FormTextarea,
  FormFileInput,
  EmojiButton,
  Button,
} from '@/components'
import { ReviewCreateValue, ReviewScore } from '@/type'
import classNames from 'classnames'
import {
  useCloseLunchWithReviewMutation,
  useClosePartyWithReviewMutation,
} from '@/queries'
import { PencilIcon } from '@heroicons/react/outline'
import { openToast } from '@/components/toast'

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
  const [score, setScore] = useState<ReviewScore>()
  const [hasContent, setHasContent] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { query } = useRouter()
  const { id, lunch } = query

  const createReviewSchema = Yup.object().shape({})
  const handleCreateReview = (values: ReviewCreateValue) => {
    if (!score) {
      openToast('맛집 평가를 선택해 주세요')
      return
    }
    if (isSubmitting) return
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('content', values.content)
    formData.append('score', String(score))
    values.image.forEach((img) => formData.append('image', img))
    if (domain === 'party') {
      closePartyWithReviewMutation.mutate({ id, data: formData })
    } else if (domain === 'lunch') {
      closeLunchWithReviewMutation.mutate({ id: lunch, data: formData })
    }
  }

  const closePartyWithReviewMutation = useClosePartyWithReviewMutation(
    closeModal,
    setIsSubmitting,
  )

  const closeLunchWithReviewMutation = useCloseLunchWithReviewMutation(
    closeModal,
    setIsSubmitting,
  )

  return (
    <Modal handleClose={closeModal} isOpen={isOpen} title="식사는 어떠셨나요?">
      <div className="mt-4 flex flex-col items-center">
        <div className="grid grid-cols-3 gap-2">
          <EmojiButton
            emoji={ReviewScore.GOOD}
            score={score}
            setScore={setScore}
          />
          <EmojiButton
            emoji={ReviewScore.SOSO}
            score={score}
            setScore={setScore}
          />
          <EmojiButton
            emoji={ReviewScore.BAD}
            score={score}
            setScore={setScore}
          />
        </div>
        <p className="mt-6">
          맛집은 어떠셨나요? 동료들에게 메시지를 남겨주세요
        </p>
        <Button
          onClick={() => setHasContent(!hasContent)}
          color="white"
          className="mt-4 flex w-full items-center justify-center sm:w-72"
        >
          {!hasContent && <PencilIcon className="mr-2 h-5 w-5" />}

          {hasContent ? '취소' : '리뷰쓰기'}
        </Button>

        <div className={classNames('mt-6 w-3/4', { hidden: !hasContent })}>
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
