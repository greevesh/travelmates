import { create } from 'zustand'

type Location = string | undefined

interface TripState {
  locationQuery: string
  setLocationQuery: (query: string) => void
  location: Location
  setLocation: (location: Location) => void
  startDate: Date | undefined
  setStartDate: (startDate: Date | undefined) => void
  endDate: Date | undefined
  setEndDate: (endDate: Date | undefined) => void
  tripDates: string[]
  setTripDates: (dates: any) => void
}

export const useTripStore = create<TripState>((set) => ({
	locationQuery: '',
	setLocationQuery: (locationQuery: string) => set({ locationQuery }),
	location: undefined,
	setLocation: (location) => set({ location }),
	startDate: undefined,
	setStartDate: (startDate) => set({ startDate }),
	endDate: undefined,
	setEndDate: (endDate) => set({ endDate }),
	tripDates: [],
	setTripDates: (tripDates) => set({ tripDates })
}))
