import { tripsEndpoint } from "@/consts/api"
import axios from 'axios'
import { fetchUserCredentials } from "./auth"
import { handleError } from "./errorHandler"

export default async function fetchCurrentUserTrips() {
    const { username, accessToken } = await fetchUserCredentials()
    if (!username || !accessToken) {
        throw new Error('Missing user credentials')
    }
    try {
        const res = await axios.get(tripsEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-Username': username || ''
            },
    })
        if (__DEV__) console.log('fetched trips: ', res.data)
        return res.data
    }
    catch(err) {
        handleError(err, 'Failed to fetch the current trip')
        throw err
    }
}