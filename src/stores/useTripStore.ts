import { create } from 'zustand'

type Location = string | undefined
type TDate = Date | undefined

interface TripState {
  locationQuery: string
  setLocationQuery: (query: string) => void
  location: Location
  setLocation: (location: Location) => void
  startDate: TDate
  setStartDate: (startDate: TDate) => void
  endDate: TDate
  setEndDate: (endDate: TDate) => void
}

export const useTripStore = create<TripState>((set) => ({
	locationQuery: '',
	setLocationQuery: (locationQuery: string) => set({ locationQuery }),
	location: undefined,
	setLocation: (location) => set({ location }),
	startDate: undefined,
	setStartDate: (startDate) => set({ startDate }),
	endDate: undefined,
	setEndDate: (endDate) => set({ endDate })
}))
