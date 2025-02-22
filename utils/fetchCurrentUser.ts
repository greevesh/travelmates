import * as SecureStore from 'expo-secure-store'
import { usersEndpoint } from "@/consts/api"
import axios from 'axios'

export default async function fetchCurrentUserId() {
    try {
        const username = await SecureStore.getItemAsync('username')
        const refreshToken = await SecureStore.getItemAsync('refreshToken')
        const res = await axios.get(usersEndpoint + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
                'X-Username': username || ''
            },
    })
        return res.data[0]._id
    }
    catch(err) {
        console.error('err: ', err)
        throw err
    }
}