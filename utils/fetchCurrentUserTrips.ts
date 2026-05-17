import { tripsEndpoint } from "@/consts/api"
import axios from 'axios'
import { withAuthRetry } from "./auth"
import { handleError } from "./errorHandler"

export default async function fetchCurrentUserTrips() {
    try {
        const res = await withAuthRetry((headers) => axios.get(tripsEndpoint, { headers }))
        if (__DEV__) console.log('fetched trips: ', res.data)
        return res.data
    }
    catch(err) {
        handleError(err, 'Failed to fetch the current trip')
        throw err
    }
}