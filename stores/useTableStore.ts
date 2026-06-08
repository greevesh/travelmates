import { create } from 'zustand'

export interface Friend {
    senderId: string | undefined
    senderUsername: string | undefined
    senderPic: string | undefined
}

interface TableState {
    rows: Friend[]
    addRow: (friend: Friend) => void
    setRows: (friends: Friend[]) => void
}

export const useTableStore = create<TableState>((set) => ({
    rows: [],

    addRow: (row) =>
      set((state) => ({
        rows: [...state.rows, row],
      })),

    setRows: (rows) =>
      set({ rows }),
  }))