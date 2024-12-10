import { StyleSheet, View } from 'react-native'
import { ProgressBar } from 'react-native-paper'

interface IProgressProps {
	progress: number
}

export default function Progress({ progress }: IProgressProps) {
	return (
		<View style={{ display: 'flex', alignItems: 'center' }}>
			<ProgressBar style={styles.progress} progress={progress} color="#006994" />
		</View>
	)
}

const styles = StyleSheet.create({
	progress: {
		marginVertical: 20,
		width: 250,
	}
})