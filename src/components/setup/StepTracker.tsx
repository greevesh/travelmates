import { useState } from 'react'

import Progress from './Progress'
import StepButtons from './StepButtons'

interface IStepTrackerProps {
	step: number
	setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function StepTracker({ step, setStep }: IStepTrackerProps) {
	const [progress, setProgress] = useState(0.33)
    
	const increment = () => {
		setStep(step + 1)
		step === 1 ? setProgress(progress + 0.33) : setProgress(progress + 0.34)
	}

	const decrement = () => {
		setStep(step - 1)
		step === 2 ? setProgress(progress - 0.33) : setProgress(progress - 0.34)
	}

	return (
		<>
			<StepButtons step={step} increment={increment} decrement={decrement} />
			<Progress progress={progress} />
		</>
	)
}