import { usersEndpoint } from "@/consts/api"
import axios from 'axios'
import { fetchUserCredentials, getAuthHeaders } from "./auth"
import { handleError } from "./errorHandler"

export default async function fetchCurrentUser() {
    const { username } = await fetchUserCredentials()
    if (!username) {
        throw new Error('Missing user credentials')
    }
    try {
        const res = await axios.get(usersEndpoint + username, {
            headers: await getAuthHeaders(),
        })
        return res.data[0]
    }
    catch(err) {
        handleError(err, 'Failed to fetch the current user')
        throw err
    }
}