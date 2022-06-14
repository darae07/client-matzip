import { TeamMember, TeamMemberDetail } from '@/type'
import { Modal, UserAvatar } from '@/components'
import { useQuery } from 'react-query'
import { retrieveTeamMember } from '@/api'

interface Props {
  isOpen: boolean
  setIsOpen: Function
  user: TeamMember
}

export const UserDetailModal = ({
  isOpen,
  setIsOpen,
  user,
}: Props): JSX.Element => {
  const closeModal = () => setIsOpen(false)

  const { data, error, isLoading } = useQuery(
    ['teamMemberProfile'],
    () => retrieveTeamMember<TeamMemberDetail>(user.id),
    { enabled: !!user.id, refetchOnWindowFocus: false, refetchOnMount: false },
  )

  return (
    <Modal handleClose={closeModal} isOpen={isOpen}>
      <div>
        <UserAvatar user={user} size="large" />
        <div className="mt-4 text-2xl font-bold">{user.member_name}</div>
        <p>{user.title}</p>

        {data && (
          <div className="mt-4">
            <p>{data.user.email}</p>
            <p>{data.user.phone_number}</p>
          </div>
        )}
      </div>
    </Modal>
  )
}
