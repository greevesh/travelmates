import { create } from 'zustand'

interface AuthState {
  isSignedIn: boolean
  setIsSignedIn: (status: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	isSignedIn: false,
	setIsSignedIn: (status) => set({ isSignedIn: status }),
}))
