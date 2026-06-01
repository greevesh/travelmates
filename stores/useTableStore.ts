import { create } from 'zustand'

export interface Friend {
    senderId: string | undefined
    senderUsername: string | undefined
    senderPic: string | undefined
}

interface TableState {
    friends: Friend[]
    tableHeight: number
    addFriend: (friend: Friend) => void
    setFriends: (friends: Friend[]) => void
    setTableHeight: (val: number) => void
}

export const useTableStore = create<TableState>((set) => ({
    friends: [],
    tableHeight: 300,

    addFriend: (friend) =>
      set((state) => ({
        friends: [...state.friends, friend],
      })),

    setFriends: (friends) =>
      set({ friends }),

    setTableHeight: (val) =>
      set((state) => ({
        tableHeight: state.tableHeight = val
      }))
  }))