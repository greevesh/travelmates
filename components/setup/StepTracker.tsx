import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

import Progress from './Progress'
import StepButtons from './StepButtons'
import { View } from 'react-native'

interface IStepTrackerProps {
	step: number
	setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function StepTracker({ step, setStep }: IStepTrackerProps) {
	const [progress, setProgress] = useState(0.25)

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
		<View style={{ ...styles.stepTracker, bottom: step === 4 ? -141 : -100 } }>
			<StepButtons step={step} increment={increment} decrement={decrement} />
			<Progress progress={progress} />
		</View>
	)
}

const styles = StyleSheet.create({
	stepTracker: {
		position: 'absolute',
		top: 250,
		left: 23,
	}
})