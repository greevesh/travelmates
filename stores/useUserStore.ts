import { create } from 'zustand'

export interface User {
    _id: number
    username: string
    pic: string
}

interface UsersState {
  selectedUsers: User[]
  setSelectedUsers: (user: User) => void
  removeSelectedUser: (user: User) => void
  clearSelectedUsers: () => void
}

export const useUserStore = create<UsersState>((set) => ({
	selectedUsers: [],
	setSelectedUsers: (user: User) => set((state) => ({
		selectedUsers: [...state.selectedUsers, user]
	})),
	removeSelectedUser: (user: User) => set((state) => ({
		selectedUsers: state.selectedUsers.filter((selectedUser: User) => selectedUser._id !== user._id)
	})),
	clearSelectedUsers: () => set(() => ({
		selectedUsers: []
	}))
}))
