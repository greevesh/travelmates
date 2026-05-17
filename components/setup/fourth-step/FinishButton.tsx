/* eslint-disable no-mixed-spaces-and-tabs */
import { Alert, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import axios from 'axios'

import { s3ProfilePicsEndpoint, setupEndpoint } from '@/consts/api'
import { useTripStore } from '@/stores/useTripStore'
import { useUserStore } from '@/stores/useUserStore'
import uploadImage from '@/utils/uploadImageToS3'
import { useCurrentUserStore } from '@/stores/useProfilePhotoStore'
import { router } from 'expo-router'
import fetchCurrentUser from '@/utils/fetchCurrentUser'
import { useState } from 'react'
import Spinner from '@/components/base/Spinner'
import { fetchUserCredentials, withAuthRetry } from '@/utils/auth'

export default function FinishButton() {
	const [loading, setLoading] = useState<boolean>(false)
	const { setPhoto, photo, setUploaded } = useCurrentUserStore((state) => ({
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

    const { clearSelectedUsers } = useUserStore((state) => ({
		clearSelectedUsers: state.clearSelectedUsers
	}))

	const clearSetupForm = () => {
		setPhoto('')
		setUploaded(false)
		setLocationQuery('')
		setLocation('')
		setStartDate(undefined)
		setEndDate(undefined)
		clearSelectedUsers()
	}

	const handlePostData = async () => {
		setLoading(true)
        const { username, accessToken } = await fetchUserCredentials()
		const { _id } = await fetchCurrentUser()
		const trip = { startDate, endDate, location, userId: _id }
		try {
			const user = { 
				username, 
				...(photo !== '' ? { pic: s3ProfilePicsEndpoint + photo.split('/').pop() } : {}),
				accessToken 
			}
			const res = await withAuthRetry((headers) => axios.post(setupEndpoint, { user, trip }, { headers }))
			photo !== '' && await uploadImage(photo)
			clearSetupForm()
			if (__DEV__) console.log('data: ', res.data)
			router.push('/hub')
			return res.data
		}
		catch (err) {
			setLoading(false)
			if (!trip.startDate || !trip.endDate || !trip.location) {
				Alert.alert('Please fill in all required fields (*).')
			}
			else {
				Alert.alert('Something went wrong.', 'Please check your internet connection and try again.')
			}
			throw err
		}
		finally {
			setLoading(false)
		}
	}

	return (
        <View style={styles.container}>
            <Button onPress={handlePostData} style={{ borderRadius: 7 }} buttonColor='#28A745' textColor='#fff'>{loading ? <Spinner /> : 'Finish'}</Button>
        </View>
	)
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 200,
        left: 297
    }
})