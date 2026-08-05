import { create } from 'zustand'
import { type Trip } from '@/types'

interface TripsState {
  trips: Trip[]
  setTrips: (trips: Trip[]) => void
  addTrip: (trip: Trip) => void
}

export const useTripsStore = create<TripsState>((set) => ({
    trips: [],
	  setTrips: (trips) => set({ trips }),
    addTrip: (trip: Trip) => set((state) => ({ trips: [...state.trips, trip] }))
}))
