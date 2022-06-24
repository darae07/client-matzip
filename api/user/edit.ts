import { authorizedInstance } from '@/api/setupAxios'
import { Dispatch } from '@reduxjs/toolkit'
import httpRequest from '@/constants/httpRequest'
import { setUserTeamProfile } from '@/store/modules'
import { openToast } from '@/components'
import { TeamMember } from '@/type/user'

export const editMyProfile =
  (data: FormData) => async (dispatch: Dispatch<any>) => {
    try {
      const { data: response } = await authorizedInstance.post(
        `/group/member/upload_image/`,
        data,
        {
          headers: {
            'Content-Type': httpRequest.REQUEST_HEADER_CONTENTS_MULTIPART_FORM,
          },
        },
      )
      const { result, message, success } = response
      if (success) {
        dispatch(
          updateSuccess(result, message || '프로필을 업데이트 했습니다.'),
        )
      } else {
        dispatch(updateFail(message || '프로필을 업데이트할 수 없습니다.'))
      }
    } catch (error) {
      dispatch(updateFail('프로필을 업데이트할 수 없습니다.'))
    }
  }

const updateSuccess =
  (result: TeamMember, message: string) => async (dispatch: Dispatch) => {
    dispatch(setUserTeamProfile(result))
    openToast(message)
  }
const updateFail = (message: string) => async (dispatch: Dispatch) => {
  openToast(message)
}
