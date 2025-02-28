import { usersEndpoint } from "@/consts/api"
import axios from 'axios'
import { fetchUserCredentials } from "./auth"

export default async function fetchCurrentUserId() {
    try {
        const { username, refreshToken } = await fetchUserCredentials()
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
        console.error('Error: Failed to fetch the current user id: ', err)
        throw err
    }
}