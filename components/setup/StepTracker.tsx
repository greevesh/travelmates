import { useEffect, useMemo, useState } from 'react'

import Progress from './Progress'
import StepButtons from './StepButtons'

interface IStepTrackerProps {
	step: number
	setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function StepTracker({ step, setStep }: IStepTrackerProps) {
	const [progress, setProgress] = useState(0.25)
	// const roundedProgress = useMemo(() => Math.round(progress * 10) / 10, [progress])

	useEffect(() => {
		console.log(progress)
	}, [progress])
    
	const increment = () => {
		setStep(step + 1)
		step === 1 ? setProgress(progress + 0.25) : setProgress(progress + 0.25)
	}

	const decrement = () => {
		setStep(step - 1)
		step === 2 ? setProgress(progress - 0.25) : setProgress(progress - 0.25)
	}

	return (
		<>
			<StepButtons step={step} increment={increment} decrement={decrement} />
			<Progress progress={progress} />
		</>
	)
}