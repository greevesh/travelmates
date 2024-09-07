import { create } from 'zustand'

interface ProfilePhotoState {
  photo: string
  setPhoto: (photo: string) => void
  uploaded: boolean
  setUploaded: (uploaded: boolean) => void
}

export const useProfilePhotoStore = create<ProfilePhotoState>((set) => ({
	photo: '',
	setPhoto: (photo) => set({ photo }),
	uploaded: false,
	setUploaded: (uploaded) => set({ uploaded })
}))
