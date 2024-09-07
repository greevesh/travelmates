import { StyleSheet, View } from 'react-native'
import { MD3Colors, ProgressBar } from 'react-native-paper'

interface IProgressProps {
	progress: number
}

export default function Progress({ progress }: IProgressProps) {
	return (
		<View style={{ display: 'flex', alignItems: 'center' }}>
			<ProgressBar style={styles.progress} progress={progress} color={MD3Colors.primary50} />
		</View>
	)
}

const styles = StyleSheet.create({
	progress: {
		marginVertical: 20,
		width: 250,
	}
})