import { tripsEndpoint } from "@/consts/api"
import axios from 'axios'
import { fetchUserCredentials } from "./auth"

export default async function fetchCurrentUserTrip() {
    try {
        const { username, refreshToken } = await fetchUserCredentials()
        const res = await axios.get(tripsEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
                'X-Username': username || ''
            },
    })
        return res.data
    }
    catch(err) {
        console.error('Error: Failed to fetch the current trip: ', err)
        throw err
    }
}