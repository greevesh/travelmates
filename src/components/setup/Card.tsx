import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'
import { useEffect, useState } from 'react'

import FirstStep from './FirstStep'
import StepTracker from './StepTracker'
import BaseTitle from '../base/Title'
import SecondStep from './SecondStep'

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
	const [step, setStep] = useState(2)

	useEffect(() => {
		step === 1 ? setTitle('Profile Photo') : step === 2 ? setTitle('Trip') : setTitle('Friends')
	}, [step])

	return (
		<Card style={styles.card}>
			<Title text={title} />
			{step === 1 ? <FirstStep /> : step === 2 ? <SecondStep /> : '' }
			<StepTracker step={step} setStep={setStep} />
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		width: '90%',
		borderWidth: 1,
		borderColor: '#d3d3d3',
		backgroundColor: '#fff'
	},
	title: {
		fontSize: 24,
		textAlign: 'center', 
		paddingVertical: 15
	},
})