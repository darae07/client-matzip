import React from 'react'
import { render } from '@testing-library/react'
import { Modal } from './Modal'

describe('일반 모달 컴포넌트', () => {
    it('모달 컴포넌트 렌더링', () => {
        const { getByRole } = render(<Modal />)
        expect(getByRole('modal')).toBeInTheDocument();
    })
})