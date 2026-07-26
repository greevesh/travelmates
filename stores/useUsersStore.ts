import { create } from 'zustand'

export interface User {
    _id: string | undefined
    username: string | undefined
    pic: string | undefined
}

interface UsersState {
    users: User[]
    addUser: (user: User) => void
    setUsers: (users: User[]) => void
}

export const useUsersStore = create<UsersState>((set) => ({
    users: [],

    addUser: (user) =>
      set((state) => ({
        users: [...state.users, user],
      })),

    setUsers: (users) =>
      set({ users }),
  }))