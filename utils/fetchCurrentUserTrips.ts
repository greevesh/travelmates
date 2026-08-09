import { currentUserTripsEndpoint } from "@/consts/api"
import axios from 'axios'
import { withAuthRetry } from "./auth"
import { handleApiError } from "./errorHandler"

export default async function fetchCurrentUserTrips() {
    try {
        const res = await withAuthRetry((headers) => axios.get(currentUserTripsEndpoint, { headers }))
        if (__DEV__) console.log('fetched trips: ', res.data)
        return res.data
    }
    catch(err) {
        handleApiError(err, 'Failed to fetch the current trip')
        throw err
    }
}