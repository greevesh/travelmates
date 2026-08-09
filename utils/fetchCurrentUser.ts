import { usersEndpoint } from "@/consts/api"
import axios from 'axios'
import { fetchUserCredentials, withAuthRetry } from "./auth"
import { handleApiError } from "./errorHandler"

export default async function fetchCurrentUser() {
    const { username } = await fetchUserCredentials()
    if (!username) {
        throw new Error('Missing user credentials')
    }
    try {
        const res = await withAuthRetry((headers) => axios.get(usersEndpoint + username, { headers }))
        return res.data[0]
    }
    catch(err) {
        handleApiError(err, 'Failed to fetch the current user')
        throw err
    }
}