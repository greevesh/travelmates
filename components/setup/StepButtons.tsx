/* eslint-disable no-mixed-spaces-and-tabs */
import { View, StyleSheet, Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { Button } from 'react-native-paper'
import axios from 'axios'

import NextButton from './buttons/NextButton'
import PreviousButton from './buttons/PreviousButton'
import { s3ProfilePicsEndpoint, setupEndpoint } from '../../consts/api'
import { useTripStore } from '../../stores/useTripStore'
import { useFriendshipStore } from '../../stores/useFriendshipStore'
import { useUserStore } from '@/stores/useUserStore'
import uploadImage from '@/utils/uploadImageToS3'
import { useProfilePhotoStore } from '@/stores/useProfilePhotoStore'
import { router } from 'expo-router'
import fetchCurrentUserId from '@/utils/fetchCurrentUser'
import { useState } from 'react'
import Spinner from '../base/Spinner'

interface IStepButtonsProps {
    step: number
    increment: () => void
    decrement: () => void
}

export default function StepButtons({ step, increment, decrement }: IStepButtonsProps) {
	const [loading, setLoading] = useState<boolean>(false)
	const { setPhoto, photo, setUploaded } = useProfilePhotoStore((state) => ({
		setPhoto: state.setPhoto,
		photo: state.photo,
		setUploaded: state.setUploaded
	}))
	
	const { setLocationQuery, setLocation, location, setStartDate, startDate, setEndDate, endDate } = useTripStore((state) => ({
		setLocationQuery: state.setLocationQuery,
		setLocation: state.setLocation,
		location: state.location,
		setStartDate: state.setStartDate,
		startDate: state.startDate,
		setEndDate: state.setEndDate,
		endDate: state.endDate,
	}))

	const clearSetupForm = () => {
		setPhoto('')
		setUploaded(false)
		setLocationQuery('')
		setLocation('')
		setStartDate(undefined)
		setEndDate(undefined)
		clearSelectedUsers()
		clearFriendships()
	}

	const { clearSelectedUsers } = useUserStore((state) => ({
		clearSelectedUsers: state.clearSelectedUsers
	}))

	const { friendships, clearFriendships } = useFriendshipStore((state) => ({
		friendships: state.friendships,
		clearFriendships: state.clearFriendships
	}))

	const handlePostData = async () => {
		setLoading(true)
		const userId = await fetchCurrentUserId()
		const trip = { startDate, endDate, location, userId }
		try {
			const user = { 
				username: await SecureStore.getItemAsync('username'), 
				...(photo !== '' ? { pic: s3ProfilePicsEndpoint + photo.split('/').pop() } : {}),
				refreshToken: await SecureStore.getItemAsync('refreshToken') 
			}
			const res = await axios.post(setupEndpoint, { user, trip, friendships },
				{
					headers: {
						'Authorization': `Bearer ${user.refreshToken}`
					}
				}
			)
			photo !== '' && await uploadImage(photo)
			clearSetupForm()
			console.log('data: ', res.data)
			router.push('/hub')
			return res.data
		}
		catch (err) {
			if (!trip.startDate || !trip.endDate || !trip.location) {
				Alert.alert('Please fill in all required fields (*).')
			}
			else {
				Alert.alert('Something went wrong.', 'Please check your internet connection and try again.')
			}
			throw err
		}
	}

	return (
		<>
			<View style={styles.stepBtnContainer}>
				{step > 1 && <PreviousButton decrement={decrement} />}
				{step === 2 && <NextButton increment={increment} />}
				{step === 3 && <NextButton increment={increment} />}
				{step === 4 && <Button onPress={handlePostData} style={{ borderRadius: 7 }} buttonColor='#28A745' textColor='#fff'>{loading ? <Spinner /> : 'Finish'}</Button>}
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