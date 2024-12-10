import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'

import ProfilePhoto from '../edit/ProfilePhoto'
import EditPhotoButtons from '../edit/EditPhotoButtons'

export default function FirstStep() {
	return (
		<>
			<Card.Actions style={styles.container}>
				<ProfilePhoto size={85} />
				<EditPhotoButtons />
			</Card.Actions>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: 137,
		alignContent: 'center',
	},
})