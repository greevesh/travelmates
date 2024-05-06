import { StyleSheet, Text } from 'react-native'

interface IErrorProps {
    msg: string | undefined
}

export default function Error({msg}: IErrorProps) {
	return (
		<Text style={styles.error}>{msg}</Text>
	)
}

const styles = StyleSheet.create({
	error: {
		width: 290,
		marginTop: 5,
		marginBottom: 10,
		marginLeft: 15,
		color: 'red'
	}
})