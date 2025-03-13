import { create } from 'zustand'

interface ProfilePhotoState {
  username: string
  setUsername: (username: string) => void
  photo: string
  setPhoto: (photo: string) => void
  uploaded: boolean
  setUploaded: (uploaded: boolean) => void
}

export const useCurrentUserStore = create<ProfilePhotoState>((set) => ({
  username: '',
  setUsername: (username) => set({ username }),
	photo: '',
	setPhoto: (photo) => set({ photo }),
	uploaded: false,
	setUploaded: (uploaded) => set({ uploaded })
}))
