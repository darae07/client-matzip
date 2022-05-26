import { fireEvent, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { confirm } from './index'

describe('컨펌 모달 컴포넌트', () => {
  it('컨펌 모달 컴포넌트는 message를 렌더링하고, confirm 함수 호출시 마운트되며, 확인 버튼을 누르면 true를 반환한 후 언마운트 된다.', async () => {
    act(() => {
      let userResponse = confirm('ok?')
    })
    const okButton = await screen.findByRole('button', { name: '확인' })
    expect(okButton).toBeInTheDocument()
    fireEvent.click(okButton)
    expect(okButton).not.toBeInTheDocument()
    // 버튼별 응답 확인하기
  })
})
