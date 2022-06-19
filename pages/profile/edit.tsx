import { HomeLayout } from '@/components/layout'
import { NextPageWithLayout, TeamMember } from '@/type'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import {
  Button,
  Form,
  FormFileInput,
  FormInput,
  WhiteRoundedCard,
} from '@/components'
import { editMyProfile } from '@/api/user'

const EditProfile: NextPageWithLayout = () => {
  const { isLoading, user } = useAppSelector((state) => state.user)
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.back()
    }
  }, [user])

  const dispatch = useAppDispatch()
  const handleSubmit = (values: any) => {
    const data = new FormData()
    data.append('member_name', values.member_name || '')
    data.append('title', values.title || '')
    if (user?.team_profile?.image !== values.image) {
      data.append('image', values.image[0])
    }
    dispatch(editMyProfile(data))
  }

  return (
    <div>
      {user?.team_profile && (
        <WhiteRoundedCard className="relative">
          <p className="mb-4 text-xl font-bold">내 프로필</p>
          <Form<TeamMember>
            onSubmit={handleSubmit}
            options={{
              defaultValues: user?.team_profile,
            }}
          >
            <FormFileInput<TeamMember>
              name="image"
              accept={{
                'image/jpeg': ['.jpeg', '.png', '.jpg'],
              }}
              mode="update"
            />

            <FormInput<TeamMember> name="member_name" className="py-4" />
            <FormInput<TeamMember> name="title" placeholder="소개글" />
            <Button
              type="submit"
              color="blue"
              className="absolute top-6 right-7"
            >
              수정
            </Button>
          </Form>
        </WhiteRoundedCard>
      )}
    </div>
  )
}

export default EditProfile

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
