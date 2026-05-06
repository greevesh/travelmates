import { usersEndpoint } from "@/consts/api"
import axios from 'axios'
import { fetchUserCredentials } from "./auth"
import { handleError } from "./errorHandler"

export default async function fetchCurrentUser() {
    try {
        const { username, accessToken } = await fetchUserCredentials()
        const res = await axios.get(usersEndpoint + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-Username': username || ''
            },
    })
        return res.data[0]
    }
    catch(err) {
        handleError(err, 'Failed to fetch the current user')
        throw err
    }
}