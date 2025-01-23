import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'
import { useEffect, useState } from 'react'

import FirstStep from './FirstStep'
import StepTracker from './StepTracker'
import BaseTitle from '../base/Title'
import SecondStep from './second-step/SecondStep'
import ThirdStep from './third-step/ThirdStep'
import FourthStep from './fourth-step/FourthStep'

interface ITitleProps {
    text: string
}

function Title({ text }: ITitleProps) {
	return (
		<BaseTitle style={styles.title}>{text}</BaseTitle>
	)
}

export default function SetupCard() {
	const [title, setTitle] = useState('Profile Photo')
	const [step, setStep] = useState(1)

	useEffect(() => {
		step === 1 ? setTitle('Profile Photo') : step === 2 ? setTitle('Travel Location') : step === 3 ? setTitle('Dates') : setTitle('Add two friends')
	}, [step])

	return (
		<Card style={styles.card}>
			<Title text={title} />
			{step === 1 ? <FirstStep /> : step === 2 ? <SecondStep /> : step === 3 ? <ThirdStep /> : <FourthStep /> }
			<StepTracker step={step} setStep={setStep} />
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		width: '90%',
		borderWidth: 1,
		borderColor: '#d3d3d3',
		backgroundColor: '#fff',
		height: 325
	},
	title: {
		fontSize: 24,
		textAlign: 'center', 
		paddingVertical: 15
	},
})