import React, {
  createContext,
  HTMLAttributes,
  Children,
  useContext,
  useState,
} from 'react'
import { ButtonProps, Button } from '@/components'

interface StepperContextValue {
  currentStep: number
  setStep?: Function
  pageLength: number
}

const StepperContextInitialValue = {
  currentStep: 0,
  pageLength: 0,
}

const StepperContext = createContext<StepperContextValue>(
  StepperContextInitialValue,
)

export const useStepperContext = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error(
      'Stepper 조합 컴포넌트는 Stepper 컴포넌트 외부에서 사용할 수 없습니다.',
    )
  }
  return context
}

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  step?: number
}

export const Stepper = ({ children, step = 0 }: StepperProps) => {
  const [currentStep, setStep] = useState(step)
  const pageLength = Children.toArray(children).filter(
    (el: any) => el.type.name === 'StepperStep',
  ).length

  const contextValue = { currentStep, setStep, pageLength }
  return (
    <div>
      <StepperContext.Provider value={contextValue}>
        {React.Children.map(children, (child: any, i) => {
          return child.type.name === 'StepperStep' && i !== currentStep
            ? null
            : child
        })}
      </StepperContext.Provider>
    </div>
  )
}

interface StepperButtonProps extends ButtonProps {
  text: string
  atctionType: 'next' | 'prev'
}

const StepperButton = ({ atctionType, ...props }: StepperButtonProps) => {
  const { setStep, currentStep, pageLength } = useStepperContext()
  const handleButton = () =>
    atctionType === 'next'
      ? setStep && setStep(currentStep + 1)
      : setStep && setStep(currentStep - 1)
  return (
    <Button
      onClick={handleButton}
      {...props}
      disabled={
        (atctionType === 'next' && currentStep === pageLength - 1) ||
        (atctionType === 'prev' && currentStep === 0)
      }
    >
      {props.text}
    </Button>
  )
}
StepperButton.displayName = 'StepperButton'

interface StepperStepProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactChild
}

const StepperStep = ({ children }: StepperStepProps) => {
  return <div>{children}</div>
}
StepperStep.displayName = 'StepperStep'

Stepper.Button = StepperButton
Stepper.Step = StepperStep
