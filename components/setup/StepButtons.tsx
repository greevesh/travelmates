/* eslint-disable no-mixed-spaces-and-tabs */
import { View, StyleSheet } from 'react-native'
// import * as SecureStore from 'expo-secure-store'
import { Button } from 'react-native-paper'
import axios from 'axios'

import NextButton from './buttons/NextButton'
import PreviousButton from './buttons/PreviousButton'
import { setupEndpoint } from '../../consts/api'
import { useTripStore } from '../../stores/useTripStore'
import { useFriendshipStore } from '../../stores/useFriendshipStore'
import { useUserStore } from '@/stores/useUserStore'

interface IStepButtonsProps {
    step: number
    increment: () => void
    decrement: () => void
}

export default function StepButtons({ step, increment, decrement }: IStepButtonsProps) {
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
		username: 'Greevesl', 
	  	password: 'Burgcoffee5!',
	  	pic: 'https://via.placeholder.com/157.jpg', 
	  	refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkdyZWV2ZXNsIiwiaWF0IjoxNzMyOTIwNDEyLCJleHAiOjE3MzMwMDY4MTJ9.9H-U_JUzRy3T_yxpIL8z3xIlLcnHmIcVWzO-ut3xItY' 
	}

	// const trip = {
	// 	startDate: startDate,
	// 	endDate: endDate,
	// 	location: location,
	// 	userId: 555
	// }

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
			clearSelectedUsers()
			clearFriendships()
			console.log('data: ', res.data)
			return res.data
		}
		catch (err) {
			console.error('Error posting data: ', err)
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
	text: {
		color: '#6E6E6E'
	},
	stepTwoBtnContainer: {
		display: 'flex', 
		alignItems: 'flex-end', 
		marginRight: 21
	},
})