import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

describe('일반 모달 컴포넌트', () => {
    it('일반 모달 컴포넌트는 children을 렌더링하며 닫기 버튼 클릭시 handleClose이 실행된다.', () => {
        const handleClose = jest.fn()

        const { getByRole, getByText } = render(<Modal isOpen={true} handleClose={handleClose}>
            <div>test</div>
        </Modal>)
        expect(getByText('test')).toBeTruthy();

        fireEvent.click(getByRole('button', { name: 'close' }))
        expect(handleClose).toHaveBeenCalledTimes(1)
    })
})