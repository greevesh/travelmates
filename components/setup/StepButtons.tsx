/* eslint-disable no-mixed-spaces-and-tabs */
import { View, StyleSheet } from 'react-native'

import NextButton from './buttons/NextButton'
import PreviousButton from './buttons/PreviousButton'
import React from 'react'

interface IStepButtonsProps {
    step: number
    increment: () => void
    decrement: () => void
}

export default function StepButtons({ step, increment, decrement }: IStepButtonsProps) {
	return (
		<>
			<View style={styles.stepBtnContainer}>
				{step > 1 && <PreviousButton decrement={decrement} />}
				{step === 2 && <NextButton increment={increment} />}
				{step === 3 && <NextButton increment={increment} />}
			</View>
			{step === 1 && 
				<View style={styles.stepOneBtnContainer}>
					<NextButton increment={increment} />
				</View>
			}
		</>
	)
}

const styles = StyleSheet.create({
	stepBtnContainer: {
		display: 'flex', 
		justifyContent: 'space-between', 
		flexDirection: 'row', 
		marginTop: 10
	},
	text: {
		color: '#6E6E6E'
	},
	stepOneBtnContainer: {
		display: 'flex', 
		alignItems: 'flex-end', 
	},
})