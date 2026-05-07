import { tripEndpoint } from "@/consts/api"
import axios from 'axios'
import { getAuthHeaders } from "./auth"
import { handleError } from "./errorHandler"

export default async function fetchCurrentUserTrips() {
    try {
        const res = await axios.get(tripEndpoint, {
            headers: await getAuthHeaders(),
        })
        if (__DEV__) console.log('fetched trips: ', res.data)
        return res.data
    }
    catch(err) {
        handleError(err, 'Failed to fetch the current trip')
        throw err
    }
}