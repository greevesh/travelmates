/* eslint-disable no-mixed-spaces-and-tabs */
import { View, StyleSheet, Alert } from 'react-native'
// import * as SecureStore from 'expo-secure-store'
import { Button } from 'react-native-paper'
import axios from 'axios'

import NextButton from './buttons/NextButton'
import PreviousButton from './buttons/PreviousButton'
import { s3ProfilePicsEndpoint, setupEndpoint } from '../../consts/api'
import { useTripStore } from '../../stores/useTripStore'
import { useFriendshipStore } from '../../stores/useFriendshipStore'
import { useUserStore } from '@/stores/useUserStore'
import { useState } from 'react'
import uploadImage from '@/utils/uploadImageToS3'
import { useProfilePhotoStore } from '@/stores/useProfilePhotoStore'

interface IStepButtonsProps {
    step: number
    increment: () => void
    decrement: () => void
}

export default function StepButtons({ step, increment, decrement }: IStepButtonsProps) {
	const [refreshToken] = useState<string | null>("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzU0MjczNTAsImV4cCI6MTczNTUxMzc1MH0.i3ov2SmFnGObDpVTwxAdTYnBQE4l6sXCWQ-Y_Ve-Ins")

	const photo = useProfilePhotoStore((state) => state.photo)
	
	const { location, startDate, endDate } = useTripStore((state) => ({
		location: state.location,
		startDate: state.startDate,
		endDate: state.endDate,
	}))

	const { clearSelectedUsers } = useUserStore((state) => ({
		clearSelectedUsers: state.clearSelectedUsers
	}))

	const { friendships, clearFriendships } = useFriendshipStore((state) => ({
		friendships: state.friendships,
		clearFriendships: state.clearFriendships
	}))

	const user = { 
		username: 'greevesh', 
		password: 'Burgcoffee5!',
		...(photo !== '' ? { pic: s3ProfilePicsEndpoint + photo.split('/').pop() } : {}),
		refreshToken: refreshToken 
	}

	const trip = { startDate, endDate, location, userId: 555 }

	const handlePostData = async () => {
		console.log('user: ', user)
		try {
			const res = await axios.post(setupEndpoint, { user, trip, friendships },
				{
					headers: {
						'Authorization': `Bearer ${user.refreshToken}`
					}
				}
			)
			photo !== '' && await uploadImage(photo)
			clearSelectedUsers()
			clearFriendships()
			console.log('data: ', res.data)
			return res.data
		}
		catch (err) {
			Alert.alert('Something went wrong.', 'Please check your internet connection and try again')
			throw err
		}
	}

	return (
		<>
			<View style={styles.stepBtnContainer}>
				{step > 1 && <PreviousButton decrement={decrement} />}
				{step === 2 && <NextButton increment={increment} />}
				{step === 3 && <NextButton increment={increment} />}
				{step === 4 && <Button onPress={handlePostData} style={{ borderRadius: 7 }} buttonColor='#28A745' textColor='#fff'>Finish</Button>}
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