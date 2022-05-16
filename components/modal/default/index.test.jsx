import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Modal } from './Modal'

describe('일반 모달 컴포넌트', () => {
    it('일반 모달 컴포넌트는 children을 렌더링한다.', () => {
        const { getByText } = render(<Modal isOpen={true} >
            <div>test</div>
        </Modal>)
        const modal = screen.queryByRole('modal')
        expect(modal).toBeInTheDocument()
        expect(getByText('test')).toBeTruthy();
    })
    it('일반 모달 컴포넌트는 닫기 버튼 클릭시 unmount되며 handleClose이 실행된다.', () => {
        const handleClose = jest.fn()

        const { getByRole } = render(<Modal isOpen={true} handleClose={handleClose} />)

        fireEvent.click(getByRole('button', { name: 'close' }))
        expect(handleClose).toHaveBeenCalledTimes(1)
        expect(modal).not.toBeInTheDocument()
    })
})