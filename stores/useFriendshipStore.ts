import { create } from 'zustand'

export interface Friendship {
    recipientId: number
    senderId: Promise<any>
    status: string
}

interface FriendshipsState {
    friendships: Friendship[]
    addFriendship: (user: Friendship) => void
    setFriendships: (friendships: Friendship[]) => void
    clearFriendships: () => void
}

export const useFriendshipStore = create<FriendshipsState>((set) => ({
	friendships: [],
	addFriendship: (friendship: Friendship) => set((state) => ({
		friendships: [...state.friendships, friendship]
	})),
  setFriendships: (friendships: Friendship[]) => set((state) => ({
    friendships: friendships
  })),
  clearFriendships: () => set(() => ({
    friendships: []
  }))
}))

