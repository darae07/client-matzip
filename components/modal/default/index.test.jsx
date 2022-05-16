import { render, fireEvent, screen } from '@testing-library/react'
import { Modal } from './Modal'

describe('일반 모달 컴포넌트', () => {
  it('일반 모달 컴포넌트는 children을 렌더링하고, 닫기 버튼 클릭시 unmount되며 handleClose이 실행된다.', () => {
    const handleClose = jest.fn()

    const { getByText, getByRole, rerender } = render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div>test</div>
      </Modal>,
    )
    const modal = screen.queryByRole('modal')
    expect(modal).toBeInTheDocument()
    expect(getByText('test')).toBeTruthy()

    fireEvent.click(getByRole('button', { name: 'close' }))

    expect(handleClose).toHaveBeenCalledTimes(1)
    rerender(<Modal isOpen={false} handleClose={handleClose} />) // update props of a rendered component
    expect(screen.queryByRole('modal')).not.toBeInTheDocument()
  })
})
