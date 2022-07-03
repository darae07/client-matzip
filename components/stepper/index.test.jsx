import { render, screen, fireEvent } from '@testing-library/react'
import { Stepper } from '@/components'

describe('단계 컴포넌트', () => {
  it('Stepper 컴포넌트는 조합 컴포넌트로 내부 Stepper.Step컴포넌트를 단계에 따라 렌더링한다.', () => {
    const { getByRole } = render(
      <Stepper>
        <Stepper.Step>
          <div>step1</div>
        </Stepper.Step>
        <Stepper.Step>
          <div>step2</div>
        </Stepper.Step>
        <Stepper.Step>
          <div>step3</div>
        </Stepper.Step>
        <Stepper.Button text="이전" atctionType="prev" />
        <Stepper.Button text="다음" atctionType="next" />
      </Stepper>,
    )
    expect(screen.getByText('step1')).toBeInTheDocument()
    fireEvent.click(getByRole('button', { name: '다음' }))
    expect(screen.getByText('step2')).toBeInTheDocument()
    fireEvent.click(getByRole('button', { name: '이전' }))
    expect(screen.getByText('step1')).toBeInTheDocument()
  })
  it('Stepper 컴포넌트는 초기값을 받을 수 있다.', () => {
    render(
      <Stepper step={1}>
        <Stepper.Step>
          <div>step1</div>
        </Stepper.Step>
        <Stepper.Step>
          <div>step2</div>
        </Stepper.Step>
        <Stepper.Step>
          <div>step3</div>
        </Stepper.Step>
        <Stepper.Button text="이전" type="prev" />
        <Stepper.Button text="다음" type="next" />
      </Stepper>,
    )
    expect(screen.getByText('step2')).toBeInTheDocument()
  })
})
