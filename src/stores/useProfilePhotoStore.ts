import { ImageSourcePropType } from 'react-native'
import { create } from 'zustand'

interface ProfilePhotoState {
  photo: NodeRequire | ImageSourcePropType | undefined
  setPhoto: (photo: NodeRequire) => void
  uploaded: boolean
  setUploaded: (uploaded: boolean) => void
}

export const useProfilePhotoStore = create<ProfilePhotoState>((set) => ({
	photo: require('../assets/img/placeholder-profile.jpg'),
	setPhoto: (photo) => set({ photo }),
	uploaded: false,
	setUploaded: (uploaded) => set({ uploaded })
}))
