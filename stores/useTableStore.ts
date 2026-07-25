import { create } from 'zustand'

export interface Row {
    _id: string | undefined
    username: string | undefined
    pic: string | undefined
}

interface TableState {
    rows: Row[]
    addRow: (row: Row) => void
    setRows: (rows: Row[]) => void
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