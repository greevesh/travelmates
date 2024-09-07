/* eslint-disable no-mixed-spaces-and-tabs */
import { View, StyleSheet } from 'react-native'

import NextButton from './buttons/NextButton'
import PreviousButton from './buttons/PreviousButton'

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
			</View>
			{step === 1 && 
            <View style={styles.stepTwoBtnContainer}>
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
		marginHorizontal: 21,
		marginTop: 10
	},
	stepTwoBtnContainer: {
		display: 'flex', 
		alignItems: 'flex-end', 
		marginRight: 21
	},
})